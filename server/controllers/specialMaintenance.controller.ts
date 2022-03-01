import {
  PrismaClient,
  SpecialMaintenance
} from '@prisma/client'

const prisma = new PrismaClient()

export interface createSpecialMaintenanceData {
  name: string
  description: string | null
  normaInMinutes: number
  malfunctionDate: string
  deviceId: number
  priorityId: number
}

export interface updateSpecialMaintenanceData {
  name?: string
  description?: string | null
  normaInMinutes?: number
  malfunctionDate?: string
  deviceId?: number
  priorityId?: number
}


export const getAllSpecialMaintenances = async () => {
  try {
    const allSpecialMaintenances = await prisma.specialMaintenance.findMany({ orderBy: { priority: { priority: 'asc' } } })
    return allSpecialMaintenances
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getAllSpecialMaintenancesWithDetails = async () => {
  try {
    const allSpecialMaintenances = await prisma.specialMaintenance.findMany({
      orderBy: { priority: { priority: 'asc' } },
      include: {
        device: true,
        priority: true,
        Instruction: true,
        MaintenanceQualification: {
          select: {
            qualification: true,
            qualificationId: true
          }
        },
        Task: {
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
    return allSpecialMaintenances
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getSpecialMaintenanceById = async (id: number) => {
  try {
    const Maintenance = await prisma.specialMaintenance.findUnique({
      where: {
        id: Number(id)
      },
    })
    return Maintenance
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getSpecialMaintenanceByIdWithDetails = async (id: number | null) => {
  try {
    if (id === null) return null
    const Maintenance = await prisma.specialMaintenance.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        device: true,
        priority: true,
        Instruction: true,
        MaintenanceQualification: {
          select: {
            qualification: true,
            qualificationId: true
          }
        },
        Task: {
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

export const createSpecialMaintenance = async (MaintenanceData: createSpecialMaintenanceData): Promise<SpecialMaintenance> => {
  try {
    const createdMaintenance = await prisma.specialMaintenance.create({
      data: MaintenanceData,
    })
    return createdMaintenance


  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteSpecialMaintenanceById = async (id: number) => {
  try {
    const validMaintenance = await prisma.specialMaintenance.findFirst({
      where: {
        id: id
      }
    })
    if (!validMaintenance) return { status: 404, message: `Maintenance not found with id: ${id}` }
    const deletedMaintenance = await prisma.specialMaintenance.delete({
      where: {
        id: Number(id)
      }
    })
    return deletedMaintenance
  } catch (error: any) {
    throw new Error(error)

  }
}

export const updateSpecialMaintenanceById = async (id: number, MaintenanceData: updateSpecialMaintenanceData) => {
  try {
    let wantToBeMaintenanceData = MaintenanceData

    const validMaintenance = await prisma.specialMaintenance.findFirst({
      where: {
        id: id
      }
    })
    if (!validMaintenance) return { status: 404, message: `Maintenance not found with id: ${id}` }

    const updatedMaintenance = await prisma.specialMaintenance.update({
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

