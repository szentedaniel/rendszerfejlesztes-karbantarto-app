import {
  PrismaClient,
  Category,
  Device,
  Instruction,
  Period,
  ScheduledMaintenance,
  ScheduledMaintenanceQualification,
  Task
} from '@prisma/client'
import createHttpError from 'http-errors'
import { getMaintanenceFromParents } from '../utils'

const prisma = new PrismaClient()

export interface createCategoryData {
  name: string,
  normaInMinutes: number,
  lastMaintenance: Date | null,
  periodId: number,
  parentId: number
}

export interface updateCategoryData {
  name: any,
  normaInMinutes: any,
  lastMaintenance: any,
  periodId: any,
  parentId: any
}

export const getAllCategories = async () => {
  try {
    const allCategories = await prisma.category.findMany({
      include: {
        children: true,
        parent: true
      },
    })
    return allCategories
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getAllCategoriesWithDetails = async () => {
  try {
    let allCategories = await prisma.category.findMany({
      include: {
        children: true,
        parent: true,
        Device: true,
        Maintenance: {
          include: {
            Instruction: true,
            MaintenanceQualification: true,
            Task: true,
            category: true,
            period: true
          }
        }
      },
    })


    Promise.all(allCategories.map((cat, idx, arr) =>
      getMaintanenceFromParents(cat.id)
        .then((data) => {
          cat.Maintenance = data
        })
        .catch(reason => { })
    ))
      .then(() => console.log(allCategories))

    async function editCategories(cats: any[]) {
      const pArray = cats.map(async (cat: any) => {
        const response = await getMaintanenceFromParents(cat.id)
        cat.Maintenance = response
        return cat
      })
      const users = await Promise.all(pArray)
      return users
    }

    const result = await editCategories(allCategories)

    return result
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getCategoryById = async (id: number) => {
  try {
    const Category = await prisma.category.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        children: true,
        parent: true
      },
    })
    return Category
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getCategoryByIdWithDetails = async (id: number) => {
  try {
    let Category = await prisma.category.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        children: true,
        parent: true,
        Device: true,
        Maintenance: {
          include: {
            Instruction: true,
            MaintenanceQualification: true,
            Task: true,
            category: true,
            period: true
          }
        }
      },
    })

    if (Category?.Maintenance) {
      if (Category.Maintenance.length === 0) {

        Category.Maintenance = await getMaintanenceFromParents(Category.id)
      }
    }

    return Category
  } catch (error: any) {
    throw new Error(error)
  }
}

export const createCategory = async (CategoryData: createCategoryData): Promise<Category> => {
  try {
    const createdCategory = await prisma.category.create({
      data: CategoryData,
    })
    return createdCategory


  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteCategoryById = async (id: number) => {
  try {
    if (id === 1) return { status: 403, message: 'A kategória nem törölhető!' }

    const validCategory = await prisma.category.findFirst({
      where: {
        id: id
      }
    })
    if (!validCategory) return { status: 404, message: `Category not found with id: ${id}` }

    const deletedCategory = await prisma.category.delete({
      where: {
        id: Number(id)
      }
    })
    return deletedCategory
  } catch (error: any) {
    throw new Error(error)

  }
}

export const updateCategoryById = async (id: number, CategoryData: updateCategoryData) => {
  try {
    let wantToBeCategoryData = CategoryData

    if (id === 1) return { status: 403, message: 'A kategória nem Módosítható!' }


    const validCategory = await prisma.category.findFirst({
      where: {
        id: id
      }
    })
    if (!validCategory) return { status: 404, message: `Category not found with id: ${id}` }

    const updatedCategory = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: wantToBeCategoryData,
    })
    return updatedCategory


  } catch (error: any) {
    throw new Error(error)

  }
}
