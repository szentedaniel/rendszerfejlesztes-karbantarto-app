import { SpecialMaintenance } from '@prisma/client'
import express from 'express'
import { getAllSpecialMaintenances, getAllSpecialMaintenancesWithDetails, getSpecialMaintenanceByIdWithDetails, deleteSpecialMaintenanceById, updateSpecialMaintenanceById, createSpecialMaintenance, getSpecialMaintenanceById, createSpecialMaintenanceData, updateSpecialMaintenanceData } from '../specialMaintenance.controller'


export const getAllSpecialMaintenanceApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const response = await getAllSpecialMaintenances()
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const getAllSpecialMaintenanceWithDetailsApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const response = await getAllSpecialMaintenancesWithDetails()
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const getSpecialMaintenanceByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const {
      id
    } = req.params
    const response = await getSpecialMaintenanceById(Number(id))
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const getSpecialMaintenanceByIdWithDetailsApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const {
      id
    } = req.params
    const response = await getSpecialMaintenanceByIdWithDetails(Number(id))
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const deleteSpecialMaintenanceByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const {
      id
    } = req.params
    const response = await deleteSpecialMaintenanceById(Number(id))
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const updateSpecialMaintenanceByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const { id } = req.params
    let wantToBeMaintenanceData: updateSpecialMaintenanceData = req.body

    const malfunctionDateToBeParse = wantToBeMaintenanceData.malfunctionDate
    if (malfunctionDateToBeParse) {
      wantToBeMaintenanceData = {
        ...wantToBeMaintenanceData, malfunctionDate: new Date(malfunctionDateToBeParse).toISOString()
      }
    }

    const response = await updateSpecialMaintenanceById(Number(id), wantToBeMaintenanceData)
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const createSpecialMaintenanceApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    let MaintenanceData: createSpecialMaintenanceData = req.body

    const malfunctionDateToBeParse = MaintenanceData.malfunctionDate
    if (malfunctionDateToBeParse) {
      MaintenanceData = {
        ...MaintenanceData, malfunctionDate: new Date(malfunctionDateToBeParse).toISOString()
      }
    }

    const response = await createSpecialMaintenance(MaintenanceData)
    res.json(response)
  } catch (error) {
    next(error)
  }
}