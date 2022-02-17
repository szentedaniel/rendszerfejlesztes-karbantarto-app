import { Maintenance, PrismaClient, User, UserRole } from '@prisma/client'
import express from 'express';


const prisma = new PrismaClient()
const router = require('express').Router()


router.get('/', async (req: express.Request, res: express.Response, next: any) => {
  res.send({ message: 'Ok api is working 🚀' })
})


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: the list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/users', async (req: express.Request, res: express.Response, next: any) => {
  try {
    const allUsers = await prisma.user.findMany({
    include: {
      UserRole: true,
      Maintenance: true,
    },
  })
  
    res.send(allUsers)
  } catch (error) {
    next(error)    
  }
  
})

router.post('/user', async (req: express.Request, res: express.Response, next: any) => {
  try {
    const allUsers = await prisma.user.findMany({
    include: {
      UserRole: true,
      Maintenance: true,
    },
  })
  console.dir(allUsers, { depth: null })

    res.send(allUsers)
  } catch (error) {
    next(error)    
  }
  
})

module.exports = router;
