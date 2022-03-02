import { PrismaClient } from '@prisma/client'
import { UserHasEnoughTime, UserIsEligibleForTask } from '../utils'

const prisma = new PrismaClient()

export interface createTaskData {
  scheduledMaintenanceId: number | null
  specialMaintenanceId: number | null
  userId: number | null
  due: Date
  description: string | null
  acceptedAt: Date | null
  declinedAt: Date | null
  startedAt: Date | null
  finishedAt: Date | null
  statusId: number
  createdByUserId: number
}

export interface acceptStartFinishTaskData {
  userId: number
}

export interface declineTaskData {
  userId: number
  description: string
}

export interface updateTaskData {
  name?: string
  normaInMinutes?: number
  lastMaintenance?: string | null
  periodId?: number
  categoryId?: number
  priorityId?: number
}

export const getAllTask = async () => {
  try {
    const allTask = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } })
    return allTask
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getAllTaskWithDetails = async () => {
  try {
    const allTask = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          include: {
            Role: true,
            UserQualification: {
              include: {
                qualification: true
              }
            }
          }
        },
        scheduledMaintenance: {
          include: {
            Instruction: true,
            MaintenanceQualification: {
              include: {
                qualification: true
              }
            },
            category: true,
            period: true,
            priority: true,
          }
        },
        specialMaintenance: {
          include: {
            Instruction: true,
            MaintenanceQualification: {
              include: {
                qualification: true
              }
            },
            device: true,
            priority: true
          }
        },
        status: true,
      }
    })
    return allTask
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getAllTaskByUserId = async (userId: number) => {
  try {
    const allTask = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        userId: userId
      }
    })
    return allTask
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getAllTaskWithDetailsByUserId = async (userId: number) => {
  try {
    const allTask = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        userId: userId
      },
      include: {
        user: {
          include: {
            Role: true,
            UserQualification: {
              include: {
                qualification: true
              }
            }
          }
        },
        scheduledMaintenance: {
          include: {
            Instruction: true,
            MaintenanceQualification: {
              include: {
                qualification: true
              }
            },
            category: true,
            period: true,
            priority: true,
          }
        },
        specialMaintenance: {
          include: {
            Instruction: true,
            MaintenanceQualification: {
              include: {
                qualification: true
              }
            },
            device: true,
            priority: true
          }
        },
        status: true,
      }
    })
    return allTask
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getTaskById = async (id: number) => {
  try {
    const allTask = await prisma.task.findUnique({
      where: {
        id: id
      }
    })
    return allTask
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getTaskWithDetailsById = async (id: number) => {
  try {
    const allTask = await prisma.task.findUnique({
      where: {
        id: id
      },
      include: {
        user: {
          include: {
            Role: true,
            UserQualification: {
              include: {
                qualification: true
              }
            }
          }
        },
        scheduledMaintenance: {
          include: {
            Instruction: true,
            MaintenanceQualification: {
              include: {
                qualification: true
              }
            },
            category: true,
            period: true,
            priority: true,
          }
        },
        specialMaintenance: {
          include: {
            Instruction: true,
            MaintenanceQualification: {
              include: {
                qualification: true
              }
            },
            device: true,
            priority: true
          }
        },
        status: true,
      }
    })
    return allTask
  } catch (error: any) {
    throw new Error(error)
  }
}

export const createTask = async (TaskData: createTaskData, userForceNull: boolean = false) => {
  try {
    if (TaskData.userId && !userForceNull) {
      const hasQualification = await UserIsEligibleForTask(TaskData.userId, TaskData.scheduledMaintenanceId, TaskData.specialMaintenanceId)
      if (!hasQualification) return { status: 400, message: 'The user does not have all the qualifications for maintenance.' }
      const hasEnoughTime = await UserHasEnoughTime(TaskData.userId, TaskData.due, TaskData.scheduledMaintenanceId, TaskData.specialMaintenanceId)
      if (!hasEnoughTime) return await UserHasEnoughTime(TaskData.userId, TaskData.due, TaskData.scheduledMaintenanceId, TaskData.specialMaintenanceId, true)

    }
    const allTask = await prisma.task.create({
      data: TaskData
    })
    return allTask
  } catch (error: any) {
    throw new Error(error)
  }
}

export const acceptTask = async (TaskData: acceptStartFinishTaskData, id: number) => {
  try {
    const allTask = await prisma.task.update({
      data: {
        statusId: 2,
        acceptedAt: new Date(Date.now())
      },
      where: {
        id: id
      }
    })
    return allTask
  } catch (error: any) {
    throw new Error(error)
  }
}

export const declineTask = async (TaskData: declineTaskData, id: number) => {
  try {
    const allTask = await prisma.task.update({
      data: {
        statusId: 3,
        description: TaskData.description,
        declinedAt: new Date(Date.now())
      },
      where: {
        id: id
      }
    })
    return allTask
  } catch (error: any) {
    throw new Error(error)
  }
}

export const startTask = async (TaskData: acceptStartFinishTaskData, id: number) => {
  try {
    const allTask = await prisma.task.update({
      data: {
        statusId: 4,
        startedAt: new Date(Date.now())
      },
      where: {
        id: id
      }
    })
    return allTask
  } catch (error: any) {
    throw new Error(error)
  }
}

export const finishTask = async (TaskData: acceptStartFinishTaskData, id: number) => {
  try {
    const allTask = await prisma.task.update({
      data: {
        statusId: 5,
        finishedAt: new Date(Date.now())
      },
      where: {
        id: id
      }
    })
    if (allTask) updateLastMaintenance(allTask.scheduledMaintenanceId!, allTask.finishedAt!)
    return allTask
  } catch (error: any) {
    throw new Error(error)
  }
}

const updateLastMaintenance = async (id: number, last: Date) => {
  try {
    const allTask = await prisma.scheduledMaintenance.update({
      data: {
        lastMaintenance: last
      },
      where: {
        id: id
      }
    })
    return allTask
  } catch (error: any) {
    throw new Error(error)
  }
}

export interface assignTaskData {
  operatorId: number
  userId: number
}

export const assignTask = async (taskData: assignTaskData, id: number) => {
  try {
    const allTask = await prisma.task.update({
      data: {
        userId: taskData.userId,
        statusId: 1
      },
      where: {
        id: id
      }
    })
    if (allTask) updateLastMaintenance(allTask.scheduledMaintenanceId!, allTask.finishedAt!)
    return allTask
  } catch (error: any) {
    throw new Error(error)
  }
}