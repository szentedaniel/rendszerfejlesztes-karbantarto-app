import { Category, Device, Instruction, Period, Priority, ScheduledMaintenance, ScheduledMaintenanceQualification, Task, User } from "@prisma/client"
import { getCategoryById, getCategoryByIdWithDetails } from "../controllers/category.controller"
import { getScheduledMaintenanceById } from "../controllers/scheduledMaintenance.controller"
import {
  PrismaClient
} from '@prisma/client'

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