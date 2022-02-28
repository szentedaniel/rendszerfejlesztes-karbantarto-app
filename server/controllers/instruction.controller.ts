import {
  PrismaClient,
  Instruction
} from '@prisma/client'

const prisma = new PrismaClient()



export interface instructionData {
  title: string,
  body: string | null,
  scheduledMaintenanceId: number | null,
  specialMaintenanceId: number | null
}

export const getAllInstructions = async () => {
  try {
    const instructions = await prisma.instruction.findMany({

    })
    return instructions
  } catch (error: any) {
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

export const createInstructionForMaintenance = async (instructionData: instructionData) => {
  try {
    const createdInstruction = await prisma.instruction.create({
      data: {
        ...instructionData
      }
    })
    return createdInstruction
  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteInstruction = async (id: number) => {
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

export const updateInstruction = async (id: number, instructionData: instructionData) => {
  try {
    const validInstruction = await prisma.category.findFirst({
      where: {
        id: id
      }
    })
    if (!validInstruction) return { status: 404, message: `Instruction not found with id: ${id}` }

    const updatedInstruction = await prisma.instruction.update({
      where: {
        id: Number(id)
      },
      data: instructionData
    })
    return updatedInstruction
  } catch (error: any) {
    throw new Error(error)

  }
}