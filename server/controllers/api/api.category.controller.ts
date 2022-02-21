import express from 'express'
import { createCategory, createCategoryData, deleteCategoryById, getAllCategories, getAllCategoriesWithDetails, getCategoryById, getCategoryByIdWithDetails, updateCategoryById, updateCategoryData } from '../category.controller'

export const getAllCategoryApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const response = await getAllCategories()
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const getAllCategoryWithDetailsApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const response = await getAllCategoriesWithDetails()
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const getCategoryByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const {
      id
    } = req.params
    const response = await getCategoryById(Number(id))
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const getCategoryByIdWithDetailsApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const {
      id
    } = req.params
    const response = await getCategoryByIdWithDetails(Number(id))
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const deleteCategoryByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const {
      id
    } = req.params
    const response = await deleteCategoryById(Number(id))
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const updateCategoryByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const { id } = req.params
    let wantToBeCategoryData: updateCategoryData = req.body
    const response = await updateCategoryById(Number(id), wantToBeCategoryData)
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const createCategoryApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    let CategoryData: createCategoryData = req.body
    const response = await createCategory(CategoryData)
    res.json(response)
  } catch (error) {
    next(error)
  }
}


