import { User } from '@prisma/client'
import express from 'express'
import {
    createQualification,
    createQualificationData,
    getAllQualifications
} from '../qualification.controller'

export const getAllQualificationsApi = async (
    req: express.Request,
    res: express.Response,
    next: any) => {
        try{
            const response = await getAllQualifications()
            res.json(response)
        }catch (error){
            next(error)
        }
}

export const createQualificationApi = async (
    req: express.Request,
    res: express.Response,
    next: any) => {
    try {
        let qualificationData: createQualificationData = req.body
        const response = await createQualification(qualificationData)
        res.json(response)
    } catch (error) {
        next(error)
    }
}