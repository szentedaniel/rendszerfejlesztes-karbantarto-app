import { PrismaClient } from '@prisma/client'
import { Category, Device, Instruction, Period, ScheduledMaintenanceQualification, Task, User } from "@prisma/client"
import { getAllScheduledMaintenancesWithDetails, getScheduledMaintenanceByIdWithDetails } from "../controllers/scheduledMaintenance.controller"
import { getUserQualificationById } from "../controllers/userQualification.controller"
import { getSpecialMaintenanceByIdWithDetails } from "../controllers/specialMaintenance.controller"
import { getQualificationById } from "../controllers/qualification.controller"
import { createTask, createTaskData, getAllTaskWithDetails, getAllTaskWithDetailsByUserId } from "../controllers/task.controller"
import { LogToDb } from "../controllers/logger.controller"
import { getAllUsers } from "../controllers/user.controller"
const sh = require('shelljs')

const prisma = new PrismaClient()

export function exclude<User, Key extends keyof User>(
  user: User,
  ...keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key]
  }
  return user
}

export const removePasswordFromUserArray = (array: Array<User>): Array<User> => {
  const users = array.map(user => {
    exclude(user, 'password')
    return user
  })
  //console.log(users)

  return users
}

interface ScheduledMaintenanceSajat {
  id: number
  name: string
  normaInMinutes: number
  lastMaintenance: Date | null
  periodId: number
  period: Period
  categoryId: number
  category: Category
  priorityId: number
  MaintenanceQualification: ScheduledMaintenanceQualification[]
  Instruction: Instruction[]
  Task: Task[]
}

interface CategorySajat {
  id: number
  name: string
  parentId: number | null
  Maintenance: ScheduledMaintenanceSajat[]
  children: Category[]
  parent: Category | null
  Device: Device[]
}


export const getMaintanenceFromParents = async (categoryId: number): Promise<ScheduledMaintenanceSajat[]> => {
  let result: ScheduledMaintenanceSajat[] = []
  try {
    let Category = await prisma.category.findUnique({
      where: {
        id: Number(categoryId)
      },
      include: {
        children: true,
        parent: true,
        Device: true,
        Maintenance: {
          include: {
            Instruction: true,
            MaintenanceQualification: true,
            Task: true,
            category: true,
            period: true
          }
        }
      },
    })

    if (Category?.Maintenance) {
      if (Category?.Maintenance?.length === 0) {
        if (Category.parentId) {
          categoryId = Category.parentId
          const wannaBeMaintenance: ScheduledMaintenanceSajat[] = await getMaintanenceFromParents(categoryId)

          return wannaBeMaintenance
        } else {
          return result
        }
      } else { return Category!.Maintenance }

    } else { return result }

  } catch (error: any) {
    throw new Error(error)
  }
}


export const UserIsEligibleForTask = async (userId: number, scheduledMaintenanceId: number | null, specialMaintenanceId: number | null) => {
  if ((!scheduledMaintenanceId && !specialMaintenanceId) || (scheduledMaintenanceId && specialMaintenanceId)) {
    return false
  }


  const maintenance = await getScheduledMaintenanceByIdWithDetails(scheduledMaintenanceId) || await getSpecialMaintenanceByIdWithDetails(specialMaintenanceId)

  const requirements = maintenance!.MaintenanceQualification.map(q => { return q.qualificationId })

  //console.log(requirements)

  const valamik = await Promise.all(requirements.map(async (r): Promise<any> => {
    //console.log(r);
    //console.log(userId);

    const q = await getUserQualificationById(r, userId)
    //console.log(q);

    let result = false
    if (q) result = true
    return result
  }))
  //console.log(valamik);


  let has = await Promise.all(requirements.map(async (r): Promise<any> => {
    const q = await getUserQualificationById(r, userId)
    let result = null
    if (q) result = await getQualificationById(r)
    return result
  }))

  let need = await Promise.all(requirements.map(async (r): Promise<any> => {
    const q = await getUserQualificationById(r, userId)
    let result = null
    if (!q) result = await getQualificationById(r)
    return result
  }))

  has = has.filter(h => { return h })
  need = need.filter(l => { return l })



  //requirements.map(async r => {
  //  return await getUserQualificationById(r, userId)
  //})
  //console.log('vane', valamik)

  //console.log({ has: has })
  //console.log({ need: need })


  //console.log('user megfelelő?: ', valamik);

  return valamik.every(e => { return e === true })
}
export const sameDay = (d1: Date, d2: Date) => {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
}

export const UserHasEnoughTime = async (userId: number, due: Date, scheduledMaintenanceId: number | null, specialMaintenanceId: number | null, showErrorMessage: boolean = false, engedettElteres: number = 1.2) => {
  if ((!scheduledMaintenanceId && !specialMaintenanceId) || (scheduledMaintenanceId && specialMaintenanceId)) {
    return false
  }


  const maintenance = await getScheduledMaintenanceByIdWithDetails(scheduledMaintenanceId) || await getSpecialMaintenanceByIdWithDetails(specialMaintenanceId)

  const tasksByUser = await getAllTaskWithDetailsByUserId(userId)

  let tasksOnDayDue = await Promise.all(tasksByUser.map(async (t): Promise<any> => {
    const q = sameDay(t.due, due)
    if (q && (t.statusId === 1 || t.statusId === 2 || t.statusId === 4 || t.statusId === 5)) { // 1-kiosztva,    2-elfogadva,    4-elkezdve,     5-befejezve
      const maintenance = await getScheduledMaintenanceByIdWithDetails(t.scheduledMaintenanceId) || await getSpecialMaintenanceByIdWithDetails(t.specialMaintenanceId)
      return maintenance?.normaInMinutes
    }
  }))

  const minutesOnDay = tasksOnDayDue.reduce((r, c) => r + c, 0)

  const tasksOnDayDueWithWannaBeTasks = (0 + (minutesOnDay) + maintenance!.normaInMinutes)

  //console.log(tasksOnDayDueWithWannaBeTasks)

  if (tasksOnDayDueWithWannaBeTasks * engedettElteres > (60 * 8)) {
    return (showErrorMessage ? {
      status: 400, message: `${tasksOnDayDueWithWannaBeTasks * engedettElteres
        } minutes is more than the working time (480)`
    } : false)
  } else return true

}

export const autoGenerateScheduledMaintenances = async () => {

  const now = new Date()

  console.log('Checking for new scheduled maintanences... (' + now.toLocaleString() + ')')

  // Lekérni a karbantartásokat
  const scheduleds = await getAllScheduledMaintenancesWithDetails()

  // Lekérni a taskokat
  const tasks = await getAllTaskWithDetails()

  scheduleds.forEach(async maintenance => {
    let lastTasksDate = await Promise.all(tasks.map(async t => {
      if (maintenance.id === t.scheduledMaintenanceId && t.statusId !== 1 && t.statusId !== 2 && t.statusId !== 3 && t.statusId !== 4 && t.statusId !== 6 && t.statusId === 5) {
        return t.finishedAt
      }
    }))
    let newerTasks = await Promise.all(tasks.map(async t => {
      if (maintenance.id === t.scheduledMaintenanceId && (t.due > now || sameDay(t.due, now))) {
        return t.due
      }
    }))

    if (maintenance.lastMaintenance) lastTasksDate.push(maintenance.lastMaintenance)
    lastTasksDate = lastTasksDate.filter(t => t)
    if (lastTasksDate.length > 1) {
      lastTasksDate = lastTasksDate.sort((a, b) => b!.getTime() - a!.getTime())
    }
    lastTasksDate = lastTasksDate.slice(0, 1)
    //console.log(maintenance.id, lastTasksDate)

    newerTasks = newerTasks.filter(t => t)
    if (newerTasks.length > 1) {
      newerTasks = newerTasks.sort((a, b) => b!.getTime() - a!.getTime())
    }
    newerTasks = newerTasks.slice(0, 1)
    //console.log(maintenance.id, newerTasks)

    if (newerTasks.length > 0) {
      //console.log(maintenance.id, 'Van már új scheduled task')

    } else {




      let plusOneDay = 0
      if (now.getHours() > 17) {
        plusOneDay = 1
      }
      const wannaBeTaskDate = new Date()
      wannaBeTaskDate.setDate(wannaBeTaskDate.getDate() + plusOneDay)
      wannaBeTaskDate.setHours(8)


      if (lastTasksDate.length > 0) {
        wannaBeTaskDate.setDate(lastTasksDate[0]!.getDate() + maintenance.period.periodInDays + plusOneDay)
        if (wannaBeTaskDate.getDay() == 6) wannaBeTaskDate.setDate(wannaBeTaskDate.getDate() + 2)
        if (wannaBeTaskDate.getDay() == 7) wannaBeTaskDate.setDate(wannaBeTaskDate.getDate() + 1)
      }
      //console.log('New maintenance is due on: ', wannaBeTaskDate)

      const users = await getAllUsers()
      let karbantartok = await Promise.all(users.map(async u => {
        if (u.active && u.roleId === 4) return u
      }))

      karbantartok = karbantartok.filter(k => k)

      if (karbantartok.length > 0) {
        karbantartok = await Promise.all(karbantartok.map(async k => {
          if (await UserIsEligibleForTask(k!.id, maintenance.id, null)) {
            return k
          }
        }))
        karbantartok = karbantartok.filter(k => k)

        if (karbantartok.length > 0) {
          karbantartok = await Promise.all(karbantartok.map(async k => {
            if (await UserHasEnoughTime(k!.id, wannaBeTaskDate, maintenance.id, null)) {
              const diffTime = Math.abs(now.getTime() - wannaBeTaskDate.getTime())
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

              if ((diffDays < 7) || (wannaBeTaskDate < now)) {
                const taskData: createTaskData = {
                  userId: k!.id,
                  description: 'Scheduled task generated by system',
                  due: wannaBeTaskDate,
                  scheduledMaintenanceId: maintenance.id,
                  createdByUserId: 5,
                  acceptedAt: null,
                  declinedAt: null,
                  finishedAt: null,
                  startedAt: null,
                  specialMaintenanceId: null,
                  statusId: 1
                }
                const createdTask = await createTask(taskData)
                if (await createdTask) {
                  console.log('Task created for ' + maintenance.name + ' and scheduled for ' + k?.name + ' and due on ' + wannaBeTaskDate.toDateString())
                  await LogToDb('Task created for ' + maintenance.name + ' and scheduled for ' + k?.name + ' and due on ' + wannaBeTaskDate.toDateString())
                }
              }
              return k
            }
          }))
        }
        karbantartok = karbantartok.filter(k => k)
      }

      if (karbantartok.length === 0) {
        const taskData = {
          userId: null,
          description: 'Scheduled task generated by system',
          due: wannaBeTaskDate,
          scheduledMaintenanceId: maintenance.id,
          createdByUserId: 5,
          acceptedAt: null,
          declinedAt: null,
          finishedAt: null,
          startedAt: null,
          specialMaintenanceId: null,
          statusId: 6
        }
        const createdTask = await createTask(taskData, true)
        if (await createdTask) {
          console.log('Task created for ' + maintenance.name + ' but scheduled for no one and due on ' + wannaBeTaskDate.toDateString())
          await LogToDb('Task created for ' + maintenance.name + ' and scheduled for no one and due on ' + wannaBeTaskDate.toDateString())
        }
      }



      //console.log(karbantartok)
    }


  })

  // Ha nincs Task egy karbantartásanak akkor
  // lekérni a periódust és az utolsó dátumot
  // lekérni a szükséges végzettséget
  // lekérni a userek végzettségét
  // ha van megfelelő akkor
  // ellenőrizni a normaidőt, ha belefér akkor létrehozni a taskot
  // ha nincs akkor visszaadni, hogy nincs megfelelő

  // Ha van leendő Task akkor semmit nem csinál
  console.log('Check finished (' + new Date().toLocaleString() + ')')
}

const test = async () => {
  const oneWeekFromNow = new Date()
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7 * 1)
  const result = await UserHasEnoughTime(1, oneWeekFromNow, 1, null, true)
  console.log(result)

}

//test()