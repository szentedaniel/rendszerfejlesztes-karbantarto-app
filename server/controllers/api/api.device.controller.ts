import { Device } from '@prisma/client'
import express from 'express'
import { createDevice, createDeviceData, deleteDeviceById, getAllDevices, getDeviceById, updateDeviceById, updateDeviceData } from '../device.controller'

export const getAllDeviceApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const response = await getAllDevices()
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const getDeviceByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const {
      id
    } = req.params
    const response = await getDeviceById(Number(id))
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const deleteDeviceByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const {
      id
    } = req.params
    const response = await deleteDeviceById(Number(id))
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const updateDeviceByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const { id } = req.params
    let wantToBeDeviceData: updateDeviceData = req.body
    const response: Device | any = await updateDeviceById(Number(id), wantToBeDeviceData)
    if (response.status) {
      res.json(response)
    } else res.json(response)
  } catch (error) {
    next(error)
  }
}

export const createDeviceApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    let DeviceData: createDeviceData = req.body
    const response: Device | any = await createDevice(DeviceData)
    if (response.status) {
      res.json(response)
    } else res.json(response)
  } catch (error) {
    next(error)
  }
}


