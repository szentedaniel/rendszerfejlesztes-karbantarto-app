import {
  PrismaClient,
  Category
} from '@prisma/client'

const prisma = new PrismaClient()

export interface createCategoryData {
  name: string,
  normaInMinutes: number,
  lastMaintenance: Date,
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
    const allCategories = await prisma.category.findMany({
      include: {
        children: true,
        parent: true,
        Device: true,
      },
    })
    return allCategories
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
    const Category = await prisma.category.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        children: true,
        parent: true,
        Device: true
      },
    })
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