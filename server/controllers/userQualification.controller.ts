import {
    PrismaClient,
    UserQualification
} from '@prisma/client'

const prisma = new PrismaClient()

export interface userQualificationData {
    userId: number,
    qualificationId: number
}

export const getAllUserQualifications = async () => {
    try {
        const allUsers = await prisma.userQualification.findMany({
            include: {
                qualification: true,
                user: true
            }
        })

        return allUsers
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getUserQualificationById = async (qualificationId: number, userId: number) => {
    try {
        const userQualification = await prisma.userQualification.findUnique({
            where: {
                qualificationId_userId: {
                    userId: Number(userId),
                    qualificationId: Number(qualificationId),
                }
            },
            include: {
                qualification: true,
                user: true
            }
        })

        return userQualification
    } catch (error: any) {
        throw new Error(error)
    }
}

export const createUserQualification = async (userQualification: userQualificationData) => {
    try {
        const createdUserQualification = await prisma.userQualification.create({
            data: userQualification
        })

        return createdUserQualification
    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteUserQualification = async (qualificationId: number, userId: number) => {
    try {
        const deletedUserQualification = await prisma.userQualification.delete({
            where: {
                qualificationId_userId: {
                    qualificationId: Number(qualificationId),
                    userId: Number(userId)
                }
            }
        })

        return deletedUserQualification
    } catch (error: any) {
        throw new Error(error)
    }
}

export const updateUserQualification = async (qualificationId: number, userId: Number, userQualification: userQualificationData) => {
    try {
        const updatedUserQualification = await prisma.userQualification.update({
            where: {
                qualificationId_userId: {
                    qualificationId: Number(qualificationId),
                    userId: Number(userId)
                }
            },
            data: userQualification,
            include: {
                qualification: true,
                user: true
            }
        })

        return updatedUserQualification
    } catch (error: any) {
        throw new Error(error)
    }
}