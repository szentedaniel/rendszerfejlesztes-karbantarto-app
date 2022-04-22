import {
    PrismaClient,
} from '@prisma/client'

const prisma = new PrismaClient()

export const getAllStatus = async () => {
    try {
        const allStatus = await prisma.status.findMany({})
        return allStatus
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getAllStatusWithDetails = async () => {
    try {
        const allStatus = await prisma.status.findMany({
            include: {
                Task: true
            }
        })
        return allStatus
    } catch (error: any) {
        throw new Error(error)
    }
}