import { Task } from '@prisma/client'
import express from 'express'
import { createTask, createTaskData, deleteTaskById, getAllTasks, getTaskById, updateTaskById, updateTaskData } from '../task.controller'


export const getAllTasksApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const response = await getAllTasks()
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const getTaskByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const {
      id
    } = req.params
    const response = await getTaskById(Number(id))
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const deleteTaskByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const {
      id
    } = req.params
    const response = await deleteTaskById(Number(id))
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const updateTaskByIdApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    const { id } = req.params
    let taskData: updateTaskData = req.body

    const response = await updateTaskById(Number(id), taskData)
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export const createTaskApi = async (req: express.Request, res: express.Response, next: any) => {
  try {
    let taskData: createTaskData = req.body

    const response = await createTask(taskData)
    res.json(response)
  } catch (error) {
    next(error)
  }
}