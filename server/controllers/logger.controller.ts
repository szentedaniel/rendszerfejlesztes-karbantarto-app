import { PrismaClient, } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllLogs = async () => {
  try {
    const allLogs = await prisma.logger.findMany({})

    return allLogs
  } catch (error: any) {
    throw new Error(error)
  }
}

export const LogToDb = async (message: string) => {
  try {
    const log = await prisma.logger.create({
      data: {
        message: message
      }
    })

    return log
  } catch (error: any) {
    throw new Error(error)
  }
}