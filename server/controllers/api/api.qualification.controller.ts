import { User } from '@prisma/client'
import express from 'express'
import {
    createQualification,
    createQualificationData,
    getAllQualifications,
    getQualificationById,
    deleteQualificationById,
    updateQualificationById,
    updateQualificationData
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
export const getQualificationByIdApi =async (
    req: express.Request,
    res: express.Response,
    next: any) => {
        try {
            const {
                id
            } = req.params

            const response = await getQualificationById(Number(id))
            res.json(response)
        } catch (error) {
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

export const deleteQualificationByIdApi =async (
    req: express.Request,
    res: express.Response,
    next: any) => {
        try {
            const {
                id
            } = req.params

            const response = await deleteQualificationById(Number(id))
            res.json(response)
            
        } catch (error) {
            next(error)
        }
}

export const updateQualificationByIdApi =async (
    req: express.Request,
    res: express.Response,
    next: any) => {
    
        try {
            const {
                id
            } = req.params
    
            let wantToBeQualificationData: updateQualificationData = req.body
            const response = await updateQualificationById(Number(id), wantToBeQualificationData)
            res.json(response)
        } catch (error) {
            next(error)
        }
}