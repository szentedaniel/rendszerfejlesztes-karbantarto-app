import {
    PrismaClient,
    ScheduledMaintenanceQualification,
    SpecialMaintenanceQualification
} from '@prisma/client'

const prisma = new PrismaClient()

export interface maintenanceQualificationData{
    maintenanceId: number,
    qualificationId: number
}

export const getAllScheduledMaintenanceQualifications = async () => {
    try {
        const allMaintenances = await prisma.scheduledMaintenanceQualification.findMany({
            include:{
                qualification: true,
                maintenance: true
            }
        })

        return allMaintenances
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getAllSpecialMaintenanceQualifications = async () => {
    try {
        const allMaintenances = await prisma.specialMaintenanceQualification.findMany({
            include:{
                qualification: true,
                maintenance: true
            }
        })

        return allMaintenances
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getScheduledMaintenanceQualificationById = async (qualificationId: number, maintenanceId: number) => {
    try {
        const maintenanceQualification = await prisma.scheduledMaintenanceQualification.findUnique({
            where:{
                qualificationId_maintenanceId:{
                    qualificationId: Number(qualificationId),
                    maintenanceId: Number(maintenanceId)
                }
            },
            include:{
                qualification: true,
                maintenance: true
            }
        })

        return maintenanceQualification
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getSpecialMaintenanceQualificationById = async (qualificationId: number, maintenanceId: number) => {
    try {
        const maintenanceQualification = await prisma.specialMaintenanceQualification.findUnique({
            where:{
                qualificationId_maintenanceId:{
                    qualificationId: Number(qualificationId),
                    maintenanceId: Number(maintenanceId)
                }
            },
            include:{
                qualification: true,
                maintenance: true
            }
        })

        return maintenanceQualification
    } catch (error: any) {
        throw new Error(error)
    }
}

export const createScheduledMaintenanceQualification = async (maintenanceQualification: maintenanceQualificationData) => {
    try {
        const createdMaintenanceQualification = await prisma.scheduledMaintenanceQualification.create({
            data: maintenanceQualification
        })

        return createdMaintenanceQualification
    } catch (error: any) {
        throw new Error(error)
    }
}

export const createSpecialMaintenanceQualification = async (maintenanceQualification: maintenanceQualificationData) => {
    try {
        const createdMaintenanceQualification = await prisma.specialMaintenanceQualification.create({
            data: maintenanceQualification
        })

        return createdMaintenanceQualification
    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteScheduledMaintenanceQualification = async (qualificationId: number, maintenanceId: number) => {
    try {
        const deletedMaintenanceQualification = await prisma.scheduledMaintenanceQualification.delete({
            where: {
                qualificationId_maintenanceId: {
                    qualificationId: Number(qualificationId),
                    maintenanceId: Number(maintenanceId)
                }
            }
        })

        return deletedMaintenanceQualification
    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteSpecialMaintenanceQualification = async (qualificationId: number, maintenanceId: number) => {
    try {
        const deletedMaintenanceQualification = await prisma.specialMaintenanceQualification.delete({
            where: {
                qualificationId_maintenanceId: {
                    qualificationId: Number(qualificationId),
                    maintenanceId: Number(maintenanceId)
                }
            }
        })

        return deletedMaintenanceQualification
    } catch (error: any) {
        throw new Error(error)
    }
}

export const updateScheduledMaintenanceQualification = async (qualificationId: number, maintenanceId: Number, maintenanceQualification: maintenanceQualificationData) => {
    try {
        const updatedMaintenanceQualification = await prisma.scheduledMaintenanceQualification.update({
            where: {
                qualificationId_maintenanceId: {
                    qualificationId: Number(qualificationId),
                    maintenanceId: Number(maintenanceId)
                }
            },
            data: maintenanceQualification,
            include: {
                qualification: true,
                maintenance: true
            }
        })

        return updatedMaintenanceQualification
    } catch (error: any) {
        throw new Error(error)
    }
}

export const updateSpecialMaintenanceQualification = async (qualificationId: number, maintenanceId: Number, maintenanceQualification: maintenanceQualificationData) => {
    try {
        const updatedMaintenanceQualification = await prisma.specialMaintenanceQualification.update({
            where: {
                qualificationId_maintenanceId: {
                    qualificationId: Number(qualificationId),
                    maintenanceId: Number(maintenanceId)
                }
            },
            data: maintenanceQualification,
            include: {
                qualification: true,
                maintenance: true
            }
        })

        return updatedMaintenanceQualification
    } catch (error: any) {
        throw new Error(error)
    }
}