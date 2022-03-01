import express from 'express'
import { acceptStartFinishTaskData, acceptTask, createTask, createTaskData, declineTask, declineTaskData, finishTask, getAllTask, getAllTaskByUserId, getAllTaskWithDetails, getAllTaskWithDetailsByUserId, getTaskById, getTaskWithDetailsById, startTask } from '../task.cotroller'
import { getUserById } from '../user.controller'

export const getAllTaskApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const response = await getAllTask()
        res.json(response)
    } catch (error) {
        next(error)
    }
}

export const getAllTaskWithDetailsApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const response = await getAllTaskWithDetails()
        res.json(response)
    } catch (error) {
        next(error)
    }
}

export const getAllTaskByUserIdApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const { id } = req.params
        const response = await getAllTaskByUserId(Number(id))
        res.json(response)
    } catch (error) {
        next(error)
    }
}

export const getAllTaskWithDetailsByUserIdApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const { id } = req.params
        const response = await getAllTaskWithDetailsByUserId(Number(id))
        res.json(response)
    } catch (error) {
        next(error)
    }
}

export const getTaskByIdApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const { id } = req.params
        const response = await getTaskById(Number(id))
        res.json(response)
    } catch (error) {
        next(error)
    }
}

export const getTaskWithDetailsByIdApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const { id } = req.params
        const response = await getTaskWithDetailsById(Number(id))
        res.json(response)
    } catch (error) {
        next(error)
    }
}

export const createTaskApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        let ok = true
        let taskData: createTaskData = req.body
        const dueToBeParse = taskData.due
        if (dueToBeParse) {
            taskData = {
                ...taskData, due: new Date(dueToBeParse),
            }
        }
        if (!taskData.acceptedAt) {
            taskData = {
                ...taskData, acceptedAt: null,
            }
        } if (!taskData.declinedAt) {
            taskData = {
                ...taskData, declinedAt: null,
            }
        } if (!taskData.startedAt) {
            taskData = {
                ...taskData, startedAt: null,
            }
        } if (!taskData.finishedAt) {
            taskData = {
                ...taskData, finishedAt: null,
            }
        } if (!taskData.description) {
            taskData = {
                ...taskData, description: null,
            }
        } if (!taskData.scheduledMaintenanceId) {
            taskData = {
                ...taskData, scheduledMaintenanceId: null,
            }
        } if (!taskData.specialMaintenanceId) {
            taskData = {
                ...taskData, specialMaintenanceId: null,
            }
        } if (!taskData.specialMaintenanceId && !taskData.scheduledMaintenanceId) {
            res.json({ status: 400, message: 'At least need one of these: scheduledMaintenanceId OR specialMaintenanceId' })
            ok = false
        } if (!taskData.createdByUserId) {
            res.json({ status: 400, message: 'You need to give the user\'s id who create the task (createdByUserId)' })
            ok = false
        } if (taskData.createdByUserId) {
            const user = await getUserById(taskData.createdByUserId)
            if (!user) {
                res.json({ status: 400, message: 'Not valid createdByUserId ID' })
                ok = false
            }
        }
        if (ok) {
            const response = await createTask(taskData)
            res.json(response)
        }
    } catch (error) {
        next(error)
    }
}

export const acceptTaskApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const { id } = req.params
        let ok = true
        let taskData: acceptStartFinishTaskData = req.body

        if (!taskData.userId) {
            res.json({ status: 400, message: 'You need to give the user\'s id who wants to accept the task (userId)' })
            ok = false
        } if (taskData.userId) {
            const task = await getTaskById(taskData.userId)
            if (!task) {
                res.json({ status: 400, message: 'Not valid task ID' })
                ok = false
            } if (task!.statusId !== 1) {
                res.json({ status: 400, message: 'Can\'t accept! A state nem \' Kiosztva \'' })
                ok = false
            } if (task!.userId !== taskData.userId) {
                res.json({ status: 400, message: 'Can\'t accept! It\'s not your task' })
                ok = false
            }
        }
        if (ok) {
            const response = await acceptTask(taskData, Number(id))
            res.json(response)
        }
    } catch (error) {
        next(error)
    }
}

export const declineTaskApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        let ok = true
        const { id } = req.params
        let taskData: declineTaskData = req.body

        if (!taskData.userId) {
            res.json({ status: 400, message: 'You need to give the user\'s id who wants to decline the task (userId)' })
            ok = false
        } if (taskData.userId) {
            const task = await getTaskById(taskData.userId)
            if (!task) {
                res.json({ status: 400, message: 'Not valid task ID' })
                ok = false
            } if (task!.statusId !== 1) {
                res.json({ status: 400, message: 'Can\'t decline! A state nem \' Kiosztva \'' })
                ok = false
            } if (!taskData.description) {
                res.json({ status: 400, message: 'You need to give a reason why you want to decline (description)' })
                ok = false
            } if (task!.userId !== taskData.userId) {
                res.json({ status: 400, message: 'Can\'t decline! It\'s not your task' })
                ok = false
            }
        }
        if (ok) {
            const response = await declineTask(taskData, Number(id))
            res.json(response)
        }
    } catch (error) {
        next(error)
    }
}

export const startTaskApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const { id } = req.params
        let ok = true
        let taskData: acceptStartFinishTaskData = req.body

        if (!taskData.userId) {
            res.json({ status: 400, message: 'You need to give the user\'s id who wants to start the task (userId)' })
            ok = false
        } if (taskData.userId) {
            const task = await getTaskById(taskData.userId)
            if (!task) {
                res.json({ status: 400, message: 'Not valid task ID' })
                ok = false
            } if (task!.statusId !== 2) {
                res.json({ status: 400, message: 'Can\'t start! A state nem \' Elfogadva \'' })
                ok = false
            } if (task!.userId !== taskData.userId) {
                res.json({ status: 400, message: 'Can\'t start! It\'s not your task' })
                ok = false
            }
        }
        if (ok) {
            const response = await startTask(taskData, Number(id))
            res.json(response)
        }
    } catch (error) {
        next(error)
    }
}

export const finishTaskApi = async (req: express.Request, res: express.Response, next: any) => {
    try {
        const { id } = req.params
        let ok = true
        let taskData: acceptStartFinishTaskData = req.body

        if (!taskData.userId) {
            res.json({ status: 400, message: 'You need to give the user\'s id who wants to finish the task (userId)' })
            ok = false
        } if (taskData.userId) {
            const task = await getTaskById(taskData.userId)
            if (!task) {
                res.json({ status: 400, message: 'Not valid task ID' })
                ok = false
            } if (task!.statusId !== 4) {
                res.json({ status: 400, message: 'Can\'t finish! A state nem \' Elkezdve \'' })
                ok = false
            } if (task!.userId !== taskData.userId) {
                res.json({ status: 400, message: 'Can\'t finish! It\'s not your task' })
                ok = false
            }
        }
        if (ok) {
            const response = await finishTask(taskData, Number(id))
            res.json(response)
        }
    } catch (error) {
        next(error)
    }
}