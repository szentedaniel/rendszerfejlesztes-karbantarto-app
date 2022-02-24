import {
    PrismaClient,
    User
} from '@prisma/client'
import express from 'express'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export interface createQualificationData {
    name: string
}

export interface updateQualificationData {
    name: string
}

export interface createMaintenanceQualificationData {
    qualificationId: number,
    maintenanceId: number
}

export const getAllQualifications = async () => {
    try {
        const allQualifications = await prisma.qualification.findMany({
            include: {
                MaintenanceQualification: {
                    include: {
                        maintenance: true
                    }
                },
                UserQualification:{
                    select: {
                        user: {
                            select: {
                                name: true,
                                createdAt: true,
                                updatedAt: true,
                                username: true,
                                roleId: true
                            }
                            
                        }
                    }
                }
            }
        })
        return allQualifications
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getQualificationById = async (id: number) => {
    try {
        const Qualification = await prisma.qualification.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                MaintenanceQualification: {
                    include: {
                        maintenance: true
                    }
                },
                UserQualification:{
                    select: {
                        user: {
                            select: {
                                name: true,
                                createdAt: true,
                                updatedAt: true,
                                username: true,
                                roleId: true
                            }
                            
                        }
                    }
                }
            }
        })

        return Qualification
    } catch (error: any) {
        throw new Error(error)
    }
}

export const createQualification = async (
    qualificationData: createQualificationData) => {
    try {

        const createdQualification = await prisma.qualification.create({
            data: qualificationData
        })

        return createdQualification

    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteQualificationById = async (id: number) => {
    try{
        const deletedQualification = await prisma.qualification.delete({
            where: {
                id: Number(id)
            }
        })
        return deletedQualification
    } catch (error: any){
        throw new Error(error)
    }
}

export const updateQualificationById = async (id: number, qualificationData: updateQualificationData) => {
    try {
        const updateQualification = await prisma.qualification.update({
            where: {
                id: Number(id)
            },
            data: qualificationData,
            include: {
                MaintenanceQualification: {
                    include: {
                        maintenance: true
                    }
                },
                UserQualification:{
                    select: {
                        user: {
                            select: {
                                name: true,
                                createdAt: true,
                                updatedAt: true,
                                username: true,
                                roleId: true
                            }
                            
                        }
                    }
                }
            }
        })
        return updateQualification
    } catch (error: any) {
        throw new Error(error)
    }
}