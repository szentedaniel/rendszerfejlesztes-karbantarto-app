import express from 'express'
import { deleteInstructionById, getAllInstructions, getInstructionById } from '../instruction.controller'

export const getAllInstructionsApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const response = await getAllInstructions()
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const getInstructionByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const {
      id
    } = req.params
    const response = await getInstructionById(Number(id))
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const deleteInstructionByIdApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
      const {
        id
      } = req.params
      const response = await deleteInstructionById(Number(id))
      res.json(response)
    } catch (error) {
      next(error)
    }
  }