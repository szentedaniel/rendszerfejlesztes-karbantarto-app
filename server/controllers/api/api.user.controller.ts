import { PrismaClient } from '@prisma/client'
import express from 'express'
import bcrypt from 'bcrypt'
import { getAllUsers } from '../user.controller'


export const getAllUserApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const allUsers = await getAllUsers()  
        console.dir(allUsers)
        res.json(allUsers)
    } catch (error) {
        next(error)
    }
}