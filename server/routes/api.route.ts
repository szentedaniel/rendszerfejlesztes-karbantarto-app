import express from 'express'
import { createCategoryApi, deleteCategoryByIdApi, getAllCategoryApi, getAllCategoryWithDetailsApi, getCategoryByIdApi, getCategoryByIdWithDetailsApi, updateCategoryByIdApi } from '../controllers/api/api.category.controller'
import { createDeviceApi, deleteDeviceByIdApi, getAllDeviceApi, getDeviceByIdApi, updateDeviceByIdApi } from '../controllers/api/api.device.controller'
import { createUserApi, deleteUserByIdApi, getAllUserApi, getUserByIdApi, loginApi, updateUserByIdApi } from '../controllers/api/api.user.controller'
import { createQualificationApi, deleteQualificationByIdApi, getAllQualificationsApi, getQualificationByIdApi, updateQualificationByIdApi } from '../controllers/api/api.qualification.controller'
import { getAllMaintenanceApi, getAllMaintenanceWithDetailsApi, getMaintenanceByIdApi, getMaintenanceByIdWithDetailsApi, deleteMaintenanceByIdApi, updateMaintenanceByIdApi, createMaintenanceApi } from '../controllers/api/api.maintenance.controller'

const router = express.Router()


router.get('/', async (req: express.Request, res: express.Response, next: any) => {
  res.send({ message: 'Ok api is working 🚀' })
})


// Users ROUTES
router.get('/users', async (req: express.Request, res: express.Response, next: any) => {
  getAllUserApi(req, res, next)
})

router.get('/users/:id', async (req: express.Request, res: express.Response, next: any) => {
  getUserByIdApi(req, res, next)
})

router.delete('/users/:id', async (req: express.Request, res: express.Response, next: any) => {
  deleteUserByIdApi(req, res, next)
})

router.patch('/users/:id', async (req: express.Request, res: express.Response, next: any) => {
  updateUserByIdApi(req, res, next)
})

router.post('/user', async (req: express.Request, res: express.Response, next: any) => {
  createUserApi(req, res, next)
})

router.post('/login', async (req: express.Request, res: express.Response, next: any) => {
  loginApi(req, res, next)
})


// Category ROUTES
router.get('/categories', async (req: express.Request, res: express.Response, next: any) => {
  getAllCategoryApi(req, res, next)
})

router.get('/categories/details', async (req: express.Request, res: express.Response, next: any) => {
  getAllCategoryWithDetailsApi(req, res, next)
})

router.get('/categories/:id', async (req: express.Request, res: express.Response, next: any) => {
  getCategoryByIdApi(req, res, next)
})

router.get('/categories/:id/details', async (req: express.Request, res: express.Response, next: any) => {
  getCategoryByIdWithDetailsApi(req, res, next)
})

router.delete('/categories/:id', async (req: express.Request, res: express.Response, next: any) => {
  deleteCategoryByIdApi(req, res, next)
})

router.patch('/categories/:id', async (req: express.Request, res: express.Response, next: any) => {
  updateCategoryByIdApi(req, res, next)
})

router.post('/category', async (req: express.Request, res: express.Response, next: any) => {
  createCategoryApi(req, res, next)
})


// Device ROUTES
router.get('/devices', async (req: express.Request, res: express.Response, next: any) => {
  getAllDeviceApi(req, res, next)
})

router.get('/devices/:id', async (req: express.Request, res: express.Response, next: any) => {
  getDeviceByIdApi(req, res, next)
})

router.delete('/devices/:id', async (req: express.Request, res: express.Response, next: any) => {
  deleteDeviceByIdApi(req, res, next)
})

router.patch('/devices/:id', async (req: express.Request, res: express.Response, next: any) => {
  updateDeviceByIdApi(req, res, next)
})

router.post('/device', async (req: express.Request, res: express.Response, next: any) => {
  createDeviceApi(req, res, next)
})


// Qualification Routes

router.get('/qualifications', async (req: express.Request, res: express.Response, next: any) => {
  getAllQualificationsApi(req, res, next)
})

router.get('/qualification/:id', async (req: express.Request, res: express.Response, next: any) => {
  getQualificationByIdApi(req, res, next)
})

router.post('/qualification', async (req: express.Request, res: express.Response, next: any) => {
  createQualificationApi(req, res, next)
})

router.delete('/qualification/:id',async (req: express.Request, res: express.Response, next: any) => {
  deleteQualificationByIdApi(req, res, next)
})

router.patch('/qualification/:id', async (req: express.Request, res: express.Response, next: any) => {
  updateQualificationByIdApi(req, res, next)
})


// Maintenance ROUTES
router.get('/maintenances', async (req: express.Request, res: express.Response, next: any) => {
  getAllMaintenanceApi(req, res, next)
})

router.get('/maintenances/details', async (req: express.Request, res: express.Response, next: any) => {
  getAllMaintenanceWithDetailsApi(req, res, next)
})

router.get('/maintenances/:id', async (req: express.Request, res: express.Response, next: any) => {
  getMaintenanceByIdApi(req, res, next)
})

router.get('/maintenances/:id/details', async (req: express.Request, res: express.Response, next: any) => {
  getMaintenanceByIdWithDetailsApi(req, res, next)
})

router.delete('/maintenances/:id', async (req: express.Request, res: express.Response, next: any) => {
  deleteMaintenanceByIdApi(req, res, next)
})

router.patch('/maintenances/:id', async (req: express.Request, res: express.Response, next: any) => {
  updateMaintenanceByIdApi(req, res, next)
})

router.post('/maintenance', async (req: express.Request, res: express.Response, next: any) => {
  createMaintenanceApi(req, res, next)
})

module.exports = router