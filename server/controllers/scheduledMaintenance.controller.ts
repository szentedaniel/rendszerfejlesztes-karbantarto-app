import {
  PrismaClient,
  ScheduledMaintenance
} from '@prisma/client'

const prisma = new PrismaClient()

export interface createScheduledMaintenanceData {
  name: string;
  normaInMinutes: number;
  lastMaintenance: string | null;
  periodId: number;
  categoryId: number;
  priorityId: number;
}

export interface updateScheduledMaintenanceData {
  name?: string;
  normaInMinutes?: number;
  lastMaintenance?: string | null;
  periodId?: number;
  categoryId?: number;
  priorityId?: number;
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

export const getScheduledMaintenanceById = async (id: number) => {
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

export const getScheduledMaintenanceByIdWithDetails = async (id: number | null) => {
  try {
    if (id === null) return null
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

export const createScheduledMaintenance = async (MaintenanceData: createScheduledMaintenanceData): Promise<ScheduledMaintenance> => {
  try {
    const createdMaintenance = await prisma.scheduledMaintenance.create({
      data: MaintenanceData,
    })
    return createdMaintenance


  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteScheduledMaintenanceById = async (id: number) => {
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

export const updateScheduledMaintenanceById = async (id: number, MaintenanceData: updateScheduledMaintenanceData) => {
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

