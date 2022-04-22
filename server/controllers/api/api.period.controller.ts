import express from 'express'
import { getAllPeriod, getAllPeriodWithDetails } from '../period.controller'

export const getAllPeriodApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const response = await getAllPeriod()
        res.json(response)
    } catch (error) {
        next(error)
    }
}

export const getAllPeriodWithDetailsApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const response = await getAllPeriodWithDetails()
        res.json(response)
    } catch (error) {
        next(error)
    }
}