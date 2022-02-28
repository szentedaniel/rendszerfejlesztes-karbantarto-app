import { ScheduledMaintenanceQualification, SpecialMaintenanceQualification } from "@prisma/client";
import express from "express";
import {
    createScheduledMaintenanceQualification,
    createSpecialMaintenanceQualification,
    getAllScheduledMaintenanceQualifications,
    getAllSpecialMaintenanceQualifications,
    getScheduledMaintenanceQualificationById,
    getSpecialMaintenanceQualificationById,
    updateScheduledMaintenanceQualification,
    updateSpecialMaintenanceQualification,
    deleteScheduledMaintenanceQualification,
    deleteSpecialMaintenanceQualification,
    maintenanceQualificationData
} from '../maintenanceQualification.controller'


export const getAllScheduledMaintenanceQualificationsApi =async (
    req: express.Request,
    res: express.Response,
    next: any) => {
    
        try {
            const response = await getAllScheduledMaintenanceQualifications()
            res.json(response)
        } catch (error) {
            next(error)
        }
}

export const getAllSpecialMaintenanceQualificationsApi =async (
    req: express.Request,
    res: express.Response,
    next: any) => {
    
        try {
            const response = await getAllSpecialMaintenanceQualifications()
            res.json(response)
        } catch (error) {
            next(error)
        }
}

export const getScheduledMaintenanceQualificationByIdApi =async (
    req: express.Request,
    res: express.Response,
    next: any) => {
    
        try {
            const {
                qualificationId,
                maintenanceId
            } = req.params

            const response = await getScheduledMaintenanceQualificationById(Number(qualificationId), Number(maintenanceId))
            res.json(response)
        } catch (error) {
            next(error)
        }
}

export const getSpecialMaintenanceQualificationByIdApi =async (
    req: express.Request,
    res: express.Response,
    next: any) => {
    
        try {
            const {
                qualificationId,
                maintenanceId
            } = req.params
            
            const response = await getSpecialMaintenanceQualificationById(Number(qualificationId), Number(maintenanceId))
            res.json(response)
        } catch (error) {
            next(error)
        }
}

export const createScheduledMaintenanceQualificationApi =async (
    req: express.Request,
    res: express.Response,
    next: any) => {
    
        try {
            let maintenanceQualification: maintenanceQualificationData = req.body
            const response = await createScheduledMaintenanceQualification(maintenanceQualification)
            res.json(response)
        } catch (error) {
            next(error)
        }
}

export const createSpecialMaintenanceQualificationApi =async (
    req: express.Request,
    res: express.Response,
    next: any) => {
    
        try {
            let maintenanceQualification: maintenanceQualificationData = req.body
            const response = await createSpecialMaintenanceQualification(maintenanceQualification)
            res.json(response)
        } catch (error) {
            next(error)
        }
}

export const deleteScheduledMaintenanceQualificationApi =async (
    req: express.Request,
    res: express.Response,
    next: any) => {
    
        try {
            const {
                qualificationId,
                maintenanceId
            } = req.params

            const response = await deleteScheduledMaintenanceQualification(Number(qualificationId), Number(maintenanceId))
            res.json(response)

        } catch (error) {
            next(error)
        }
}

export const deleteSpecialMaintenanceQualificationApi =async (
    req: express.Request,
    res: express.Response,
    next: any) => {
    
        try {
            const {
                qualificationId,
                maintenanceId
            } = req.params

            const response = await deleteSpecialMaintenanceQualification(Number(qualificationId), Number(maintenanceId))
            res.json(response)
            
        } catch (error) {
            next(error)
        }
}

export const updateScheduledMaintenanceQualificationApi =async (
    req: express.Request,
    res: express.Response,
    next: any) => {
    
        try {
            const {
                qualificationId,
                maintenanceId
            } = req.params
            const maintenanceQualification: maintenanceQualificationData = req.body

            const response = await updateScheduledMaintenanceQualification(Number(qualificationId), Number(maintenanceId), maintenanceQualification)
            res.json(response)
            
        } catch (error) {
            next(error)
        }
}

export const updateSpecialMaintenanceQualificationApi =async (
    req: express.Request,
    res: express.Response,
    next: any) => {
    
        try {
            const {
                qualificationId,
                maintenanceId
            } = req.params
            const maintenanceQualification: maintenanceQualificationData = req.body
            
            const response = await updateSpecialMaintenanceQualification(Number(qualificationId), Number(maintenanceId), maintenanceQualification)
            res.json(response)
            
        } catch (error) {
            next(error)
        }
}