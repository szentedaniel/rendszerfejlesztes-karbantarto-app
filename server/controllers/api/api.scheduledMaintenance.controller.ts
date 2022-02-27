import { ScheduledMaintenance } from '@prisma/client'
import express from 'express'
import { createMaintenance, createMaintenanceData, deleteMaintenanceById, getAllScheduledMaintenances, getAllScheduledMaintenancesWithDetails, getMaintenanceById, getMaintenanceByIdWithDetails, updateMaintenanceById, updateMaintenanceData } from '../scheduledMaintenance.controller'

export const getAllMaintenanceApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const response = await getAllScheduledMaintenances()
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const getAllMaintenanceWithDetailsApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const response = await getAllScheduledMaintenancesWithDetails()
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const getMaintenanceByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const {
      id
    } = req.params
    const response = await getMaintenanceById(Number(id))
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const getMaintenanceByIdWithDetailsApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const {
      id
    } = req.params
    const response = await getMaintenanceByIdWithDetails(Number(id))
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const deleteMaintenanceByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const {
      id
    } = req.params
    const response = await deleteMaintenanceById(Number(id))
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const updateMaintenanceByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const { id } = req.params
    let wantToBeMaintenanceData: ScheduledMaintenance = req.body
    const response = await updateMaintenanceById(Number(id), wantToBeMaintenanceData)
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const createMaintenanceApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    let MaintenanceData: ScheduledMaintenance = req.body
    const response = await createMaintenance(MaintenanceData)
    res.json(response)
  } catch (error) {
    next(error)
  }
}