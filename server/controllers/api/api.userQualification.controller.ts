import { UserQualification } from "@prisma/client";
import express from "express";
import {
    createUserQualification,
    getAllUserQualifications,
    getUserQualificationById,
    updateUserQualification,
    deleteUserQualification,
    userQualificationData
} from '../userQualification.controller'


export const getAllUserQualificationsApi =async (
    req: express.Request,
    res: express.Response,
    next: any) => {
    
        try {
            const response = await getAllUserQualifications()
            res.json(response)
        } catch (error) {
            next(error)
        }
}

export const getUserQualificationByIdApi =async (
    req: express.Request,
    res: express.Response,
    next: any) => {
    
        try {
            const {
                qualificationId,
                maintenanceId
            } = req.params

            const response = await getUserQualificationById(Number(qualificationId), Number(maintenanceId))
            res.json(response)
        } catch (error) {
            next(error)
        }
}

export const createUserQualificationApi =async (
    req: express.Request,
    res: express.Response,
    next: any) => {
    
        try {
            let userQualification: userQualificationData = req.body
            const response = await createUserQualification(userQualification)
            res.json(response)
        } catch (error) {
            next(error)
        }
}

export const deleteUserQualificationApi =async (
    req: express.Request,
    res: express.Response,
    next: any) => {
    
        try {
            const {
                qualificationId,
                maintenanceId
            } = req.params

            const response = await deleteUserQualification(Number(qualificationId), Number(maintenanceId))
            res.json(response)

        } catch (error) {
            next(error)
        }
}

export const updateUserQualificationApi =async (
    req: express.Request,
    res: express.Response,
    next: any) => {
    
        try {
            const {
                qualificationId,
                maintenanceId
            } = req.params
            const userQualification: userQualificationData = req.body

            const response = await updateUserQualification(Number(qualificationId), Number(maintenanceId), userQualification)
            res.json(response)
            
        } catch (error) {
            next(error)
        }
}