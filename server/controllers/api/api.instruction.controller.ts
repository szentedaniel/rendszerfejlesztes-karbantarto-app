import express from 'express'
import { deleteInstructionById } from '../instruction.controller'

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