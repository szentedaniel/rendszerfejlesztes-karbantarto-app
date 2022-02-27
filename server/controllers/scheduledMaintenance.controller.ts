import {
  PrismaClient,
  ScheduledMaintenance
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
  name?: | string
  normaInMinutes?: | number
  lastMaintenanceId?: | number | null
  periodId?: | number | null
  categoryId?: | number
}


export const getAllScheduledMaintenances = async () => {
  try {
    const allScheduledMaintenances = await prisma.scheduledMaintenance.findMany({})
    return allScheduledMaintenances
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getAllScheduledMaintenancesWithDetails = async () => {
  try {
    const allScheduledMaintenances = await prisma.scheduledMaintenance.findMany({
      include: {
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
    return allScheduledMaintenances
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getMaintenanceById = async (id: number) => {
  try {
    const Maintenance = await prisma.scheduledMaintenance.findUnique({
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
    const Maintenance = await prisma.scheduledMaintenance.findUnique({
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

export const createMaintenance = async (MaintenanceData: ScheduledMaintenance): Promise<ScheduledMaintenance> => {
  try {
    const createdMaintenance = await prisma.scheduledMaintenance.create({
      data: MaintenanceData,
    })
    return createdMaintenance


  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteMaintenanceById = async (id: number) => {
  try {
    const validMaintenance = await prisma.scheduledMaintenance.findFirst({
      where: {
        id: id
      }
    })
    if (!validMaintenance) return { status: 404, message: `Maintenance not found with id: ${id}` }
    const deletedMaintenance = await prisma.scheduledMaintenance.delete({
      where: {
        id: Number(id)
      }
    })
    return deletedMaintenance
  } catch (error: any) {
    throw new Error(error)

  }
}

export const updateMaintenanceById = async (id: number, MaintenanceData: ScheduledMaintenance) => {
  try {
    let wantToBeMaintenanceData = MaintenanceData

    const validMaintenance = await prisma.scheduledMaintenance.findFirst({
      where: {
        id: id
      }
    })
    if (!validMaintenance) return { status: 404, message: `Maintenance not found with id: ${id}` }

    const updatedMaintenance = await prisma.scheduledMaintenance.update({
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

