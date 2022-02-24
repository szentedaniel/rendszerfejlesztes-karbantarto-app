import {
  PrismaClient,
  Maintenance
} from '@prisma/client'

const prisma = new PrismaClient()

export interface createMaintenanceData {
  name: string
  normaInMinutes: number
  lastMaintenanceId?: number | null
  periodId?: number | null
  categoryId?: number
}

export interface updateMaintenanceData {
  name?:  | string
  normaInMinutes?:  | number
  lastMaintenanceId?:  | number | null
  periodId?:  | number | null
  categoryId?:  | number
}


export const getAllMaintenances = async () => {
  try {
    const allMaintenances = await prisma.maintenance.findMany({})
    return allMaintenances
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getAllMaintenancesWithDetails = async () => {
  try {
    const allMaintenances = await prisma.maintenance.findMany({
      include: {
        Instruction: true,
        MaintenanceQualification: {
          select: {
            qualification: true,
            qualificationId: true
          }
        },
        Tasks: {
          include: {
            user: {
              include: {
                Role: true,
                UserQualification: {
                  include: {
                    qualification: true
                  }
                }
              }
            },
            status: true
          }
        },
      },
    })
    return allMaintenances
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getMaintenanceById = async (id: number) => {
  try {
    const Maintenance = await prisma.maintenance.findUnique({
      where: {
        id: Number(id)
      },
    })
    return Maintenance
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getMaintenanceByIdWithDetails = async (id: number) => {
  try {
    const Maintenance = await prisma.maintenance.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        Instruction: true,
        MaintenanceQualification: {
          select: {
            qualification: true,
            qualificationId: true
          }
        },
        Tasks: {
          include: {
            user: {
              include: {
                Role: true,
                UserQualification: {
                  include: {
                    qualification: true
                  }
                }
              }
            },
            status: true
          }
        },
      },
    })
    return Maintenance
  } catch (error: any) {
    throw new Error(error)
  }
}

export const createMaintenance = async (MaintenanceData: createMaintenanceData): Promise<Maintenance> => {
  try {
    const createdMaintenance = await prisma.maintenance.create({
      data: MaintenanceData,
    })
    return createdMaintenance


  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteMaintenanceById = async (id: number) => {
  try {
    const validMaintenance = await prisma.maintenance.findFirst({where: {
      id: id
    }})
    if (!validMaintenance) return {status: 404, message: `Maintenance not found with id: ${id}`}
    const deletedMaintenance = await prisma.maintenance.delete({
      where: {
        id: Number(id)
      }
    })
    return deletedMaintenance
  } catch (error: any) {
    throw new Error(error)

  }
}

export const updateMaintenanceById = async (id: number, MaintenanceData: updateMaintenanceData) => {
  try {
    let wantToBeMaintenanceData = MaintenanceData

    const validMaintenance = await prisma.maintenance.findFirst({
      where: {
        id: id
      }
    })
    if (!validMaintenance) return { status: 404, message: `Maintenance not found with id: ${id}` }

    const updatedMaintenance = await prisma.maintenance.update({
      where: {
        id: Number(id),
      },
      data: wantToBeMaintenanceData,
    })
    return updatedMaintenance


  } catch (error: any) {
    throw new Error(error)

  }
}

