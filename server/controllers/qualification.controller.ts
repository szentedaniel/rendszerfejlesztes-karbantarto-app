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

export interface createMaintenanceQualificationData {
    qualificationId: number,
    maintenanceId: number
}

export const getAllQualifications = async () => {
    try {
        const allQualifications = await prisma.qualification.findMany({
            include: {
                MaintenanceQualification: {
                    select: {
                        maintenance: {
                            select: {
                                name: true,
                                exceptive: true,
                                categoryId: true,
                                //category: true
                            }
                        }
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
                                //Role: true
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