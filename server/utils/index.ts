import { Category, Device, Instruction, Period, Priority, ScheduledMaintenance, ScheduledMaintenanceQualification, Task, User } from "@prisma/client"
import { getCategoryById, getCategoryByIdWithDetails } from "../controllers/category.controller"
import { getScheduledMaintenanceById, getScheduledMaintenanceByIdWithDetails } from "../controllers/scheduledMaintenance.controller"
import {
  PrismaClient
} from '@prisma/client'
import { getUserQualificationById } from "../controllers/userQualification.controller"
import { getSpecialMaintenanceByIdWithDetails } from "../controllers/specialMaintenance.controller"
import { getQualificationById } from "../controllers/qualification.controller"
import { getAllTaskWithDetailsByUserId } from "../controllers/task.controller"

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
  console.log(users);

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

  console.log(requirements);

  const valamik = await Promise.all(requirements.map(async (r): Promise<any> => {
    const q = await getUserQualificationById(r, userId)
    let result = false
    if (q) result = true
    return result
  }));

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
  }));

  has = has.filter(h => { return h })
  need = need.filter(l => { return l })



  //requirements.map(async r => {
  //  return await getUserQualificationById(r, userId)
  //})
  //console.log('vane', valamik);

  //console.log({ has: has });
  //console.log({ need: need });



  return valamik.every(e => { return e === true })
}
const sameDay = (d1: Date, d2: Date) => {
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
  }));

  const minutesOnDay = tasksOnDayDue.reduce((r, c) => r + c, 0)

  const tasksOnDayDueWithWannaBeTasks = ((minutesOnDay) + maintenance!.normaInMinutes)

  console.log(tasksOnDayDueWithWannaBeTasks)

  if (tasksOnDayDueWithWannaBeTasks * engedettElteres > (60 * 8)) {
    return (showErrorMessage ? {
      status: 400, message: `${tasksOnDayDueWithWannaBeTasks * engedettElteres
        } minutes is more than the working time (480)`
    } : false)
  } else return true

}

const test = async () => {
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7 * 1);
  const result = await UserHasEnoughTime(1, oneWeekFromNow, 1, null, true)
  console.log(result);

}

//test()