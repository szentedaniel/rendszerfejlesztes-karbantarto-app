import express from 'express'
import { getAllRole } from '../role.controller'

export const getAllRoleApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const response = await getAllRole()
        res.json(response)
    } catch (error) {
        next(error)
    }
}