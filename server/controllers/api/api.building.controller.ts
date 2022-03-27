import { Building } from "@prisma/client";
import express from 'express'
import { createBuilding, createBuildingData, deleteBuildingById, getAllBuildings, getAllBuildingsWithDetails, getBuildingById, getBuildingByIdWithDetails, updateBuildingById, updateBuildingData } from '../building.controller'

export const getAllBuildingsApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const response = await getAllBuildings()
        res.json(response)
    } catch (error) {
        next(error)
    }
}

export const getAllBuildingsWithDetailsApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const response = await getAllBuildingsWithDetails()
        res.json(response)
    } catch (error) {
        next(error)
    }
}

export const getBuildingByIdApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const {
            id
        } = req.params
        const response = await getBuildingById(Number(id))
        res.json(response)
    } catch (error) {
        next(error)
    }
}

export const getBuildingByIdWithDetailsApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const {
            id
        } = req.params
        const response = await getBuildingByIdWithDetails(Number(id))
        res.json(response)
    } catch (error) {
        next(error)
    }
}

export const deleteBuildingByIdApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const {
            id
        } = req.params
        const response = await deleteBuildingById(Number(id))
        res.json(response)
    } catch (error) {
        next(error)
    }
}

export const updateBuildingByIdApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const { id } = req.params
        let wantToBeBuildingData: updateBuildingData = req.body
        const response: Building | any = await updateBuildingById(Number(id), wantToBeBuildingData)
        if (response.status) {
            res.json(response)
        } else res.json(response)
    } catch (error) {
        next(error)
    }
}

export const createBuildingApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const { id } = req.params
        let wantToBeBuildingData: createBuildingData = req.body
        const response: Building | any = await createBuilding(wantToBeBuildingData)
        if (response.status) {
            res.json(response)
        } else res.json(response)
    } catch (error) {
        next(error)
    }
}