import { User } from '@prisma/client'
import express from 'express'
import {
  createUser,
  createUserData,
  deleteUserById,
  getAllUsers,
  getUserById,
  login,
  loginUserData,
  returnWithStatusAndMessage,
  updateUserById,
  updateUserData
} from '../user.controller'


export const getAllUserApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const response = await getAllUsers()
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const getUserByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const {
      id
    } = req.params
    const response = await getUserById(Number(id))
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const deleteUserByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const {
      id
    } = req.params
    const response = await deleteUserById(Number(id))
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const updateUserByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const { id } = req.params
    let wantToBeUserData: updateUserData = req.body
    const response = await updateUserById(Number(id), wantToBeUserData)
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const createUserApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    let userData: createUserData = req.body
    const response = await createUser(userData)
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const loginApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    let userData: loginUserData = req.body
    const response: returnWithStatusAndMessage | User | any = await login(userData)
    if (response.status) {
      res.sendStatus(Number(response.status)).json(response)
    } else res.json(response)
  } catch (error) {
    next(error)
  }
}

