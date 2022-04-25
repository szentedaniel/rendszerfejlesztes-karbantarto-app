import express from 'express'
import { getAllPriority } from '../priority.controller'

export const getAllPriorityApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const response = await getAllPriority()
        res.json(response)
    } catch (error) {
        next(error)
    }
}