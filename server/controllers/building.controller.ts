import {
    PrismaClient,
    Building
} from '@prisma/client'

const prisma = new PrismaClient()

export interface createBuildingData {
    name: string
}

export interface updateBuildingData {
    name: any
}

export const getAllBuildings = async () => {
    try {
        const allBuildings = await prisma.building.findMany({
            
        })
        return allBuildings
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getAllBuildingsWithDetails = async () => {
    try {
        const allBuildings = await prisma.building.findMany({
            include: {
                Location: true
            }
        })
        return allBuildings
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getBuildingById = async (id: number) => {
    try {
        const building = await prisma.building.findUnique({
            where: {
                id: Number(id)
            }
        })
        return building
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getBuildingByIdWithDetails = async (id: number) => {
    try {
        const building = await prisma.building.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                Location: true
            }
        })
        return building
    } catch (error: any) {
        throw new Error(error)
    }
}

export const createBuilding = async (buildingData: createBuildingData) => {
    try {
        const createdBuilding = await prisma.building.create({
            data: buildingData
        })
        return createdBuilding
    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteBuildingById = async (id: number) => {
    try {
        const building = await prisma.building.findUnique({
            where: {
                id: Number(id)
            }
        })

        if(!building) {
            return {status: 404, message: `Building not found with id: ${id}`}
        }
        const deletedBuilding = await prisma.building.delete({
            where: {
                id: Number(id)
              }
        })
        return deletedBuilding
    } catch (error: any) {
        throw new Error(error)
    }
}

export const updateBuildingById = async (id: number, buildingData: updateBuildingData) => {
    try {
        const building = await prisma.building.findUnique({
            where: {
                id: Number(id)
            }
        })

        if(!building) {
            return {status: 404, message: `Building not found with id: ${id}`}
        }
        const updatedBuilding = await prisma.building.update({
            where: {
                id: Number(id)
              },
            data: buildingData
        })
        return updatedBuilding
    } catch (error: any) {
        throw new Error(error)
    }
}