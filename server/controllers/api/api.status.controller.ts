import express from 'express'
import { getAllStatus, getAllStatusWithDetails } from '../status.controller'

export const getAllStatusApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const response = await getAllStatus()
        res.json(response)
    } catch (error) {
        next(error)
    }
}

export const getAllStatusWithDetailsApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const response = await getAllStatusWithDetails()
        res.json(response)
    } catch (error) {
        next(error)
    }
}