import { Maintenance, PrismaClient, User } from '@prisma/client'
import express from 'express'
import { getAllUserApi } from '../controllers/api/api.user.controller'
import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById } from '../controllers/user.controller'

const prisma = new PrismaClient()
const router = express.Router()


router.get('/', async (req: express.Request, res: express.Response, next: any) => {
  res.send({ message: 'Ok api is working 🚀' })
})


// Users ROUTES
router.get('/users', async (req: express.Request, res: express.Response, next: any) => {
  getAllUserApi(req, res, next)
})

router.get('/users/:id', async (req: express.Request, res: express.Response, next: any) => {
  getUserById(req, res, next)  
})

router.delete('/users/:id', async (req: express.Request, res: express.Response, next: any) => {
  deleteUserById(req, res, next)  
})

router.patch('/users/:id', async (req: express.Request, res: express.Response, next: any) => {
  updateUserById(req, res, next)  
})

router.post('/user', async (req: express.Request, res: express.Response, next: any) => {
  createUser(req, res, next)
})

// ____ ROUTES



module.exports = router
