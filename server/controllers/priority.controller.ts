import {
    PrismaClient,
} from '@prisma/client'

const prisma = new PrismaClient()

export const getAllPriority = async () => {
    try {
        const allPriority = await prisma.priority.findMany({})
        return allPriority
    } catch (error: any) {
        throw new Error(error)
    }
}