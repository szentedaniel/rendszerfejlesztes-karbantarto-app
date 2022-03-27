import { Location } from "@prisma/client";
import express from 'express'
import { createLocation, createLocationData, deleteLocationById, getAllLocations, getAllLocationsWithDetails, getLocationById, getLocationByIdWithDetails, updateLocationById, updateLocationData } from '../location.controller'

export const getAllLocationsApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const response = await getAllLocations()
        res.json(response)
    } catch (error) {
        next(error)
    }
}

export const getAllLocationsWithDetailsApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const response = await getAllLocationsWithDetails()
        res.json(response)
    } catch (error) {
        next(error)
    }
}

export const getLocationByIdApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const {
            id
        } = req.params
        const response = await getLocationById(Number(id))
        res.json(response)
    } catch (error) {
        next(error)
    }
}

export const getLocationByIdWithDetailsApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const {
            id
        } = req.params
        const response = await getLocationByIdWithDetails(Number(id))
        res.json(response)
    } catch (error) {
        next(error)
    }
}

export const deleteLocationByIdApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const {
            id
        } = req.params
        const response = await deleteLocationById(Number(id))
        res.json(response)
    } catch (error) {
        next(error)
    }
}

export const updateLocationByIdApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const { id } = req.params
        let wantToBeLocationData: updateLocationData = req.body
        const response: Location | any = await updateLocationById(Number(id), wantToBeLocationData)
        if (response.status) {
            res.json(response)
        } else res.json(response)
    } catch (error) {
        next(error)
    }
}

export const createLocationApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const { id } = req.params
        let wantToBeLocationData: createLocationData = req.body
        const response: Location | any = await createLocation(wantToBeLocationData)
        if (response.status) {
            res.json(response)
        } else res.json(response)
    } catch (error) {
        next(error)
    }
}