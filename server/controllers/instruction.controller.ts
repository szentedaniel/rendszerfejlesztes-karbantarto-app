import {
    PrismaClient,
    Instruction
} from '@prisma/client'

const prisma = new PrismaClient()



export interface createInstructionDataWithoutId {
    title: string,
    body: string | null
}

export interface createInstructionData {
    title: string,
    body: string | null,
    maintenanceId: number
}

export const getAllInstructions =async () => {
  try {
    const instructions = await prisma.instruction.findMany({
      
    })
    return instructions
  } catch (error:any) {
    throw new Error(error)
  }
}

export const getInstructionById = async (id: number) => {
    try {
      const instruction = await prisma.instruction.findUnique({
        where: {
          id: Number(id)
        },
      })
      return instruction
    } catch (error: any) {
      throw new Error(error)
    }
  }

export const createInstructionForScheduledMaintenanceById = async (id: number, InstructionData: createInstructionDataWithoutId) => {
    try {
        const createdInstruction = await prisma.instruction.create({
            data: {
                ...InstructionData,
                scheduledMaintenanceId: Number(id),
                specialMaintenanceId: Number(undefined)
            }
        })
        return createdInstruction
    } catch (error: any) {
        throw new Error(error)
    }
}

export const createInstructionForMaintenance = async ( InstructionData: createInstructionData) => {
    try {
        const createdInstruction = await prisma.instruction.create({
            data: {
                ...InstructionData
            }
        })
        return createdInstruction
    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteInstructionById = async (id: number) => {
    try {
      const validInstruction = await prisma.category.findFirst({
        where: {
          id: id
        }
      })
      if (!validInstruction) return { status: 404, message: `Instruction not found with id: ${id}` }
  
      const deletedInstruction = await prisma.instruction.delete({
        where: {
          id: Number(id)
        }
      })
      return deletedInstruction
    } catch (error: any) {
      throw new Error(error)
  
    }
  }