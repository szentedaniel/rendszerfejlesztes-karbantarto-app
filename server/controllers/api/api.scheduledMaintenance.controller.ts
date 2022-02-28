import { ScheduledMaintenance } from '@prisma/client'
import express from 'express'
import { getAllScheduledMaintenances, getAllScheduledMaintenancesWithDetails, getScheduledMaintenanceByIdWithDetails, deleteScheduledMaintenanceById, updateScheduledMaintenanceById, createScheduledMaintenance, getScheduledMaintenanceById, createScheduledMaintenanceData, updateScheduledMaintenanceData } from '../scheduledMaintenance.controller'


export const getAllScheduledMaintenanceApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const response = await getAllScheduledMaintenances()
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const getAllScheduledMaintenanceWithDetailsApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const response = await getAllScheduledMaintenancesWithDetails()
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const getScheduledMaintenanceByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const {
      id
    } = req.params
    const response = await getScheduledMaintenanceById(Number(id))
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const getScheduledMaintenanceByIdWithDetailsApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const {
      id
    } = req.params
    const response = await getScheduledMaintenanceByIdWithDetails(Number(id))
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const deleteScheduledMaintenanceByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const {
      id
    } = req.params
    const response = await deleteScheduledMaintenanceById(Number(id))
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const updateScheduledMaintenanceByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const { id } = req.params
    let wantToBeMaintenanceData: updateScheduledMaintenanceData = req.body

    const lastMaintenanceToBeParse = wantToBeMaintenanceData.lastMaintenance
    if (lastMaintenanceToBeParse) {
      wantToBeMaintenanceData = {
        ...wantToBeMaintenanceData, priorityId: 4, lastMaintenance: new Date(lastMaintenanceToBeParse).toISOString()
      }
    } else {
      wantToBeMaintenanceData = {
        ...wantToBeMaintenanceData, priorityId: 4
      }
    }
    
    const response = await updateScheduledMaintenanceById(Number(id), wantToBeMaintenanceData)
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const createScheduledMaintenanceApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    let MaintenanceData: createScheduledMaintenanceData = req.body
    const lastMaintenanceToBeParse = MaintenanceData.lastMaintenance
    if (lastMaintenanceToBeParse) {
      MaintenanceData = {
        ...MaintenanceData, priorityId: 4, lastMaintenance: new Date(lastMaintenanceToBeParse).toISOString()
      }
    } else {
      MaintenanceData = {
        ...MaintenanceData, priorityId: 4
      }
    }

    const response = await createScheduledMaintenance(MaintenanceData)
    res.json(response)
  } catch (error) {
    next(error)
  }
}