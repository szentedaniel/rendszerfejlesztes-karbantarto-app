import {
    PrismaClient,
} from '@prisma/client'

const prisma = new PrismaClient()

export const getAllPeriod = async () => {
    try {
        const allPeriod = await prisma.period.findMany({})
        return allPeriod
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getAllPeriodWithDetails = async () => {
    try {
        const allPeriod = await prisma.period.findMany({
            include: {
                Maintenance: true
            }
        })
        return allPeriod
    } catch (error: any) {
        throw new Error(error)
    }
}