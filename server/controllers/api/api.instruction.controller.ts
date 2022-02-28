import express from 'express'
import { deleteInstruction, getAllInstructions, getInstructionById, createInstructionForMaintenance, updateInstruction, instructionData } from '../instruction.controller'

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

export const createInstructionApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const instructionData: instructionData = req.body

    const response = await createInstructionForMaintenance(instructionData)
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const deleteInstructionApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
      const {
        id
      } = req.params
      const response = await deleteInstruction(Number(id))
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  export const updateInstructionApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
      const {
        id
      } = req.params
      const instructionData: instructionData = req.body

      const response = await updateInstruction(Number(id), instructionData)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }