import {
    PrismaClient,
} from '@prisma/client'

const prisma = new PrismaClient()

export const getAllRole = async () => {
    try {
        const allRole = await prisma.role.findMany({})
        return allRole
    } catch (error: any) {
        throw new Error(error)
    }
}