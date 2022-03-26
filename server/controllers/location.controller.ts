import {
    PrismaClient,
    Location
} from '@prisma/client'

const prisma = new PrismaClient()

export interface createLocationData {
    name: string,
    buildingId: number
}

export interface updateLocationData {
    name: any,
    buildingId: any
}

export const getAllLocations = async () => {
    try {
        const allLocations = await prisma.location.findMany({
            
        })
        return allLocations
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getAllLocationsWithDetails = async () => {
    try {
        const allLocations = await prisma.location.findMany({
            include: {
                building: true,
                Device: true
            }
        })
        return allLocations
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getLocationById = async (id: number) => {
    try {
        const Location = await prisma.location.findUnique({
            where: {
                id: Number(id)
            }
        })
        return Location
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getLocationByIdWithDetails = async (id: number) => {
    try {
        const Location = await prisma.location.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                building: true,
                Device: true
            }
        })
        return Location
    } catch (error: any) {
        throw new Error(error)
    }
}

export const createLocation = async (LocationData: createLocationData) => {
    try {
        const createdLocation = await prisma.location.create({
            data: LocationData
        })
        return createdLocation
    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteLocationById = async (id: number) => {
    try {
        const Location = await prisma.location.findUnique({
            where: {
                id: Number(id)
            }
        })

        if(!Location) {
            return {status: 404, message: `Location not found with id: ${id}`}
        }
        const deletedLocation = await prisma.location.delete({
            where: {
                id: Number(id)
              }
        })
        return deletedLocation
    } catch (error: any) {
        throw new Error(error)
    }
}

export const updateLocationById = async (id: number, LocationData: updateLocationData) => {
    try {
        const Location = await prisma.location.findUnique({
            where: {
                id: Number(id)
            }
        })

        if(!Location) {
            return {status: 404, message: `Location not found with id: ${id}`}
        }
        const updatedLocation = await prisma.location.update({
            where: {
                id: Number(id)
              },
            data: LocationData
        })
        return updatedLocation
    } catch (error: any) {
        throw new Error(error)
    }
}