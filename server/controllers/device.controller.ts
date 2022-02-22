import {
  PrismaClient,
  Device
} from '@prisma/client'

const prisma = new PrismaClient()

export interface createDeviceData {
  name: string,
  description: string | null,
  identifier: string,
  locationId: number,
  categoryId: number
}

export interface updateDeviceData {
  name: any,
  description: any,
  identifier: any,
  locationId: any,
  categoryId: any
}

export const getAllDevices = async () => {
  try {
    const allDevices = await prisma.device.findMany({
      include: {
        category: true,
        location: true
      },
    })
    return allDevices
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getDeviceById = async (id: number) => {
  try {
    const Device = await prisma.device.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        category: true,
        location: true
      },
    })
    return Device
  } catch (error: any) {
    throw new Error(error)
  }
}

export const createDevice = async (DeviceData: createDeviceData) => {
  try {
    let wantToBeDeviceData = DeviceData
    if (wantToBeDeviceData.identifier && wantToBeDeviceData.identifier !== null) {
      const device = await prisma.device.findFirst({
        where: {
          identifier: wantToBeDeviceData.identifier
        }
      })
      if (device) {
        return { status: 403, message: `Already have a device with this identifier: ${wantToBeDeviceData.identifier}` }
      }
    }
    const createdDevice = await prisma.device.create({
      data: DeviceData,
    })
    return createdDevice
  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteDeviceById = async (id: number) => {
  try {
    const validDevice = await prisma.device.findFirst({
      where: {
        id: id
      }
    })
    if (!validDevice) return { status: 404, message: `Device not found with id: ${id}` }

    const deletedDevice = await prisma.device.delete({
      where: {
        id: Number(id)
      }
    })
    return deletedDevice
  } catch (error: any) {
    throw new Error(error)
  }
}

export const updateDeviceById = async (id: number, DeviceData: updateDeviceData) => {
  try {
    const validDevice = await prisma.device.findFirst({
      where: {
        id: id
      }
    })
    if (!validDevice) return { status: 404, message: `Device not found with id: ${id}` }


    let wantToBeDeviceData = DeviceData
    if (wantToBeDeviceData.identifier && wantToBeDeviceData.identifier !== null) {
      const device = await prisma.device.findFirst({
        where: {
          identifier: wantToBeDeviceData.identifier
        }
      })
      if (device) {
        return { status: 403, message: `Already have a device with this identifier: ${wantToBeDeviceData.identifier}` }
      }
    }
    const updatedDevice = await prisma.device.update({
      where: {
        id: Number(id),
      },
      data: wantToBeDeviceData,
    })
    return updatedDevice
  } catch (error: any) {
    throw new Error(error)
  }
}