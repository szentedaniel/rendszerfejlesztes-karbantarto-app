import {
    PrismaClient,
    Task
} from '@prisma/client'

const prisma = new PrismaClient()

export interface createTaskData {
    scheduledMaintenanceId?: number | null
    specialMaintenanceId?: number | null
    userId: number
    description?: string | null
    acceptedAt?: Date | null
    declinedAt?: Date | null
    startedAt?: Date | null
    finishedAt?: Date | null
    statusId: number
}

export interface updateTaskData {
    scheduledMaintenanceId?: any
    specialMaintenanceId?: any
    userId: any
    description?: any
    acceptedAt?: any
    declinedAt?: any
    startedAt?: any
    finishedAt?: any
    statusId: any
}


export const getAllTasks = async () => {
    try {

        let specialTasks = await prisma.task.findMany({
            where: {
                scheduledMaintenance: null
            },
            orderBy: {
                specialMaintenance: {
                    priority: {
                        priority: 'asc'
                    }
                }
            }
        })
        let scheduledTasks = await prisma.task.findMany({
            where: {
                specialMaintenance: null
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        const allTasks = specialTasks.concat(scheduledTasks)

        return allTasks
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getTaskById = async (id: number) => {
    try {
        const task = await prisma.task.findUnique({
            where: {
                id: Number(id)
            },
        })
        return task
    } catch (error: any) {
        throw new Error(error)
    }
}

export const createTask = async (taskData: createTaskData): Promise<Task> => {
    try {
        const createdTask = await prisma.task.create({
            data: taskData,
        })
        return createdTask


    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteTaskById = async (id: number) => {
    try {
        const validTask = await prisma.task.findFirst({
            where: {
                id: id
            }
        })
        if (!validTask) return { status: 404, message: `Task not found with id: ${id}` }
        const deletedMaintenance = await prisma.specialMaintenance.delete({
            where: {
                id: Number(id)
            }
        })
        return deletedMaintenance
    } catch (error: any) {
        throw new Error(error)

    }
}

export const updateTaskById = async (id: number, taskData: updateTaskData) => {
    try {
        const validTask = await prisma.task.findFirst({
            where: {
                id: id
            }
        })
        if (!validTask) return { status: 404, message: `Task not found with id: ${id}` }

        const updatedTask = await prisma.specialMaintenance.update({
            where: {
                id: Number(id),
            },
            data: taskData,
        })
        return updatedTask


    } catch (error: any) {
        throw new Error(error)

    }
}


