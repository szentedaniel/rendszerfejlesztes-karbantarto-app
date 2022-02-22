import express from 'express'
import { createMaintenance, createMaintenanceData, deleteMaintenanceById, getAllMaintenances, getAllMaintenancesWithDetails, getMaintenanceById, getMaintenanceByIdWithDetails, updateMaintenanceById, updateMaintenanceData } from '../maintenance.controller'

export const getAllMaintenanceApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const response = await getAllMaintenances()
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const getAllMaintenanceWithDetailsApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const response = await getAllMaintenancesWithDetails()
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
    let wantToBeMaintenanceData: updateMaintenanceData = req.body
    const response = await updateMaintenanceById(Number(id), wantToBeMaintenanceData)
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const createMaintenanceApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    let MaintenanceData: createMaintenanceData = req.body
    const response = await createMaintenance(MaintenanceData)
    res.json(response)
  } catch (error) {
    next(error)
  }
}