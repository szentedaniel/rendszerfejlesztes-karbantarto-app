import express from 'express'
import { createCategoryApi, deleteCategoryByIdApi, getAllCategoryApi, getAllCategoryWithDetailsApi, getCategoryByIdApi, getCategoryByIdWithDetailsApi, updateCategoryByIdApi } from '../controllers/api/api.category.controller'
import { createDeviceApi, deleteDeviceByIdApi, getAllDeviceApi, getDeviceByIdApi, updateDeviceByIdApi } from '../controllers/api/api.device.controller'
import { createUserApi, deleteUserByIdApi, getAllUserApi, getUserByIdApi, loginApi, updateUserByIdApi } from '../controllers/api/api.user.controller'
import { createQualificationApi, deleteQualificationByIdApi, getAllQualificationsApi, getQualificationByIdApi, updateQualificationByIdApi } from '../controllers/api/api.qualification.controller'
import { getAllScheduledMaintenanceQualificationsApi, getAllSpecialMaintenanceQualificationsApi, getScheduledMaintenanceQualificationByIdApi, getSpecialMaintenanceQualificationByIdApi, createScheduledMaintenanceQualificationApi, createSpecialMaintenanceQualificationApi, deleteScheduledMaintenanceQualificationApi, deleteSpecialMaintenanceQualificationApi, updateScheduledMaintenanceQualificationApi, updateSpecialMaintenanceQualificationApi } from '../controllers/api/api.maintenanceQualification.controller'
import { getAllScheduledMaintenanceWithDetailsApi, getScheduledMaintenanceByIdApi, getScheduledMaintenanceByIdWithDetailsApi, deleteScheduledMaintenanceByIdApi, updateScheduledMaintenanceByIdApi, createScheduledMaintenanceApi, getAllScheduledMaintenanceApi } from '../controllers/api/api.scheduledMaintenance.controller'
import { getAllSpecialMaintenanceApi, getAllSpecialMaintenanceWithDetailsApi, getSpecialMaintenanceByIdApi, getSpecialMaintenanceByIdWithDetailsApi, deleteSpecialMaintenanceByIdApi, updateSpecialMaintenanceByIdApi, createSpecialMaintenanceApi } from '../controllers/api/api.specialMaintenance.controller'
import { getAllInstructionsApi, getInstructionByIdApi, createInstructionApi, deleteInstructionApi, updateInstructionApi } from '../controllers/api/api.instruction.controller'
import { acceptTaskApi, createTaskApi, declineTaskApi, finishTaskApi, getAllTaskApi, getAllTaskByUserIdApi, getTaskByIdApi, getAllTaskWithDetailsApi, getAllTaskWithDetailsByUserIdApi, getTaskWithDetailsByIdApi, startTaskApi, assignTaskApi } from '../controllers/api/api.task.controller'
import { createUserQualificationApi, deleteUserQualificationApi, getAllUserQualificationsApi, getUserQualificationByIdApi, updateUserQualificationApi } from '../controllers/api/api.userQualification.controller'
import { createBuildingApi, deleteBuildingByIdApi, getAllBuildingsApi, getAllBuildingsWithDetailsApi, getBuildingByIdApi, getBuildingByIdWithDetailsApi, updateBuildingByIdApi } from '../controllers/api/api.building.controller'
import { createLocationApi, deleteLocationByIdApi, getAllLocationsApi, getAllLocationsWithDetailsApi, getLocationByIdApi, getLocationByIdWithDetailsApi, updateLocationByIdApi } from '../controllers/api/api.location.controller'
import { getAllLogsApi } from '../controllers/api/api.logger.controller'
import { getAllStatusApi, getAllStatusWithDetailsApi } from '../controllers/api/api.status.controller'
import { getAllPeriodApi, getAllPeriodWithDetailsApi } from '../controllers/api/api.period.controller'
import { getAllPriorityApi } from '../controllers/api/api.priority.controller'
import { getAllRoleApi } from '../controllers/api/api.role.controller'
const router = express.Router()


router.get('/', async (req: express.Request, res: express.Response, next: any) => {
  res.send({ message: 'Ok api is working 🚀' })
})


// Users ROUTES +
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


// Category ROUTES +
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


// Device ROUTES +
router.get('/devices', async (req: express.Request, res: express.Response, next: any) => {
  getAllDeviceApi(req, res, next)
})

router.get('/device/:id', async (req: express.Request, res: express.Response, next: any) => {
  getDeviceByIdApi(req, res, next)
})

router.delete('/device/:id', async (req: express.Request, res: express.Response, next: any) => {
  deleteDeviceByIdApi(req, res, next)
})

router.patch('/device/:id', async (req: express.Request, res: express.Response, next: any) => {
  updateDeviceByIdApi(req, res, next)
})

router.post('/device', async (req: express.Request, res: express.Response, next: any) => {
  createDeviceApi(req, res, next)
})


// Qualification Routes +
router.get('/qualifications', async (req: express.Request, res: express.Response, next: any) => {
  getAllQualificationsApi(req, res, next)
})

router.get('/qualification/:id', async (req: express.Request, res: express.Response, next: any) => {
  getQualificationByIdApi(req, res, next)
})

router.post('/qualification', async (req: express.Request, res: express.Response, next: any) => {
  createQualificationApi(req, res, next)
})

router.delete('/qualification/:id', async (req: express.Request, res: express.Response, next: any) => {
  deleteQualificationByIdApi(req, res, next)
})

router.patch('/qualification/:id', async (req: express.Request, res: express.Response, next: any) => {
  updateQualificationByIdApi(req, res, next)
})


// ScheduledMaintenance ROUTES +
router.get('/scheduledMaintenances', async (req: express.Request, res: express.Response, next: any) => {
  getAllScheduledMaintenanceApi(req, res, next)
})

router.get('/scheduledMaintenances/details', async (req: express.Request, res: express.Response, next: any) => {
  getAllScheduledMaintenanceWithDetailsApi(req, res, next)
})

router.get('/scheduledMaintenances/:id', async (req: express.Request, res: express.Response, next: any) => {
  getScheduledMaintenanceByIdApi(req, res, next)
})

router.get('/scheduledMaintenances/:id/details', async (req: express.Request, res: express.Response, next: any) => {
  getScheduledMaintenanceByIdWithDetailsApi(req, res, next)
})

router.delete('/scheduledMaintenances/:id', async (req: express.Request, res: express.Response, next: any) => {
  deleteScheduledMaintenanceByIdApi(req, res, next)
})

router.patch('/scheduledMaintenance/:id', async (req: express.Request, res: express.Response, next: any) => {
  updateScheduledMaintenanceByIdApi(req, res, next)
})

router.post('/scheduledMaintenance', async (req: express.Request, res: express.Response, next: any) => {
  createScheduledMaintenanceApi(req, res, next)
})


// SpecialMaintenance ROUTES +
router.get('/specialMaintenances', async (req: express.Request, res: express.Response, next: any) => {
  getAllSpecialMaintenanceApi(req, res, next)
})

router.get('/specialMaintenances/details', async (req: express.Request, res: express.Response, next: any) => {
  getAllSpecialMaintenanceWithDetailsApi(req, res, next)
})

router.get('/specialMaintenances/:id', async (req: express.Request, res: express.Response, next: any) => {
  getSpecialMaintenanceByIdApi(req, res, next)
})

router.get('/specialMaintenances/:id/details', async (req: express.Request, res: express.Response, next: any) => {
  getSpecialMaintenanceByIdWithDetailsApi(req, res, next)
})

router.delete('/specialMaintenances/:id', async (req: express.Request, res: express.Response, next: any) => {
  deleteSpecialMaintenanceByIdApi(req, res, next)
})

router.patch('/specialMaintenances/:id', async (req: express.Request, res: express.Response, next: any) => {
  updateSpecialMaintenanceByIdApi(req, res, next)
})

router.post('/specialMaintenance', async (req: express.Request, res: express.Response, next: any) => {
  createSpecialMaintenanceApi(req, res, next)
})

// Scheduled/SpecialMaintenanceQualification ROUTES -

router.get('/scheduledMaintenanceQualifications', async (req: express.Request, res: express.Response, next: any) => {
  getAllScheduledMaintenanceQualificationsApi(req, res, next)
})

router.get('/specialMaintenanceQualifications', async (req: express.Request, res: express.Response, next: any) => {
  getAllSpecialMaintenanceQualificationsApi(req, res, next)
})

router.get('/scheduledMaintenanceQualification/:maintenanceId/:qualificationId', async (req: express.Request, res: express.Response, next: any) => {
  getScheduledMaintenanceQualificationByIdApi(req, res, next)
})

router.get('/specialMaintenanceQualification/:maintenanceId/:qualificationId', async (req: express.Request, res: express.Response, next: any) => {
  getSpecialMaintenanceQualificationByIdApi(req, res, next)
})

router.post('/scheduledMaintenanceQualification', async (req: express.Request, res: express.Response, next: any) => {
  createScheduledMaintenanceQualificationApi(req, res, next)
})

router.post('/specialMaintenanceQualification', async (req: express.Request, res: express.Response, next: any) => {
  createSpecialMaintenanceQualificationApi(req, res, next)
})

router.delete('/scheduledMaintenanceQualification/:maintenanceId/:qualificationId', async (req: express.Request, res: express.Response, next: any) => {
  deleteScheduledMaintenanceQualificationApi(req, res, next)
})

router.delete('/specialMaintenanceQualification/:maintenanceId/:qualificationId', async (req: express.Request, res: express.Response, next: any) => {
  deleteSpecialMaintenanceQualificationApi(req, res, next)
})

router.patch('/scheduledMaintenanceQualification/:maintenanceId/:qualificationId', async (req: express.Request, res: express.Response, next: any) => {
  updateScheduledMaintenanceQualificationApi(req, res, next)
})

router.patch('/specialMaintenanceQualification/:maintenanceId/:qualificationId', async (req: express.Request, res: express.Response, next: any) => {
  updateSpecialMaintenanceQualificationApi(req, res, next)
})

// Instruction ROUTES ~
router.get('/instructions', async (req: express.Request, res: express.Response, next: any) => {
  getAllInstructionsApi(req, res, next)
})

router.get('/instruction/:id', async (req: express.Request, res: express.Response, next: any) => {
  getInstructionByIdApi(req, res, next)
})

router.post('/instruction', async (req: express.Request, res: express.Response, next: any) => {
  createInstructionApi(req, res, next)
})

router.delete('/instruction/:id', async (req: express.Request, res: express.Response, next: any) => {
  deleteInstructionApi(req, res, next)
})

router.patch('/instruction/:id', async (req: express.Request, res: express.Response, next: any) => {
  updateInstructionApi(req, res, next)
})

//UserQualification ROUTES -
router.get('/userQualifications', async (req: express.Request, res: express.Response, next: any) => {
  getAllUserQualificationsApi(req, res, next)
})

router.get('/userQualification/:userId/:qualificationId', async (req: express.Request, res: express.Response, next: any) => {
  getUserQualificationByIdApi(req, res, next)
})

router.post('/userQualification', async (req: express.Request, res: express.Response, next: any) => {
  createUserQualificationApi(req, res, next)
})

router.delete('/userQualification/:userId/:qualificationId', async (req: express.Request, res: express.Response, next: any) => {
  deleteUserQualificationApi(req, res, next)
})

router.patch('/userQualification/:userId/:qualificationId', async (req: express.Request, res: express.Response, next: any) => {
  updateUserQualificationApi(req, res, next)
})


// Task ROUTES
router.get('/tasks', async (req: express.Request, res: express.Response, next: any) => {
  getAllTaskApi(req, res, next)
})

router.get('/tasks/details', async (req: express.Request, res: express.Response, next: any) => {
  getAllTaskWithDetailsApi(req, res, next)
})

router.get('/tasks/:id', async (req: express.Request, res: express.Response, next: any) => {
  getAllTaskByUserIdApi(req, res, next)
})

router.get('/tasks/:id/details', async (req: express.Request, res: express.Response, next: any) => {
  getAllTaskWithDetailsByUserIdApi(req, res, next)
})

router.post('/task', async (req: express.Request, res: express.Response, next: any) => {
  createTaskApi(req, res, next)
})

router.get('/task/:id', async (req: express.Request, res: express.Response, next: any) => {
  getTaskByIdApi(req, res, next)
})

router.get('/task/:id/details', async (req: express.Request, res: express.Response, next: any) => {
  getTaskWithDetailsByIdApi(req, res, next)
})

router.post('/task/:id/accept', async (req: express.Request, res: express.Response, next: any) => {
  acceptTaskApi(req, res, next)
})

router.post('/task/:id/decline', async (req: express.Request, res: express.Response, next: any) => {
  declineTaskApi(req, res, next)
})

router.post('/task/:id/start', async (req: express.Request, res: express.Response, next: any) => {
  startTaskApi(req, res, next)
})

router.post('/task/:id/finish', async (req: express.Request, res: express.Response, next: any) => {
  finishTaskApi(req, res, next)
})

router.post('/task/:id/assignToUser', async (req: express.Request, res: express.Response, next: any) => {
  assignTaskApi(req, res, next)
})

// Building ROUTES +
router.get('/buildings', async (req: express.Request, res: express.Response, next: any) => {
  getAllBuildingsApi(req, res, next)
})

router.get('/buildings/details', async (req: express.Request, res: express.Response, next: any) => {
  getAllBuildingsWithDetailsApi(req, res, next)
})

router.get('/building/:id', async (req: express.Request, res: express.Response, next: any) => {
  getBuildingByIdApi(req, res, next)
})

router.get('/building/:id/details', async (req: express.Request, res: express.Response, next: any) => {
  getBuildingByIdWithDetailsApi(req, res, next)
})

router.delete('/building/:id', async (req: express.Request, res: express.Response, next: any) => {
  deleteBuildingByIdApi(req, res, next)
})

router.patch('/building/:id', async (req: express.Request, res: express.Response, next: any) => {
  updateBuildingByIdApi(req, res, next)
})

router.post('/building', async (req: express.Request, res: express.Response, next: any) => {
  createBuildingApi(req, res, next)
})

// Location ROUTES +
router.get('/locations', async (req: express.Request, res: express.Response, next: any) => {
  getAllLocationsApi(req, res, next)
})

router.get('/locations/details', async (req: express.Request, res: express.Response, next: any) => {
  getAllLocationsWithDetailsApi(req, res, next)
})

router.get('/location/:id', async (req: express.Request, res: express.Response, next: any) => {
  getLocationByIdApi(req, res, next)
})

router.get('/location/:id/details', async (req: express.Request, res: express.Response, next: any) => {
  getLocationByIdWithDetailsApi(req, res, next)
})

router.delete('/location/:id', async (req: express.Request, res: express.Response, next: any) => {
  deleteLocationByIdApi(req, res, next)
})

router.patch('/location/:id', async (req: express.Request, res: express.Response, next: any) => {
  updateLocationByIdApi(req, res, next)
})

router.post('/location', async (req: express.Request, res: express.Response, next: any) => {
  createLocationApi(req, res, next)
})

// Logger ROUTES
router.get('/logs', async (req: express.Request, res: express.Response, next: any) => {
  getAllLogsApi(req, res, next)
})

// Status
router.get('/status', async (req: express.Request, res: express.Response, next: any) => {
  getAllStatusApi(req, res, next)
})

router.get('/status/details', async (req: express.Request, res: express.Response, next: any) => {
  getAllStatusWithDetailsApi(req, res, next)
})

// Period
router.get('/period', async (req: express.Request, res: express.Response, next: any) => {
  getAllPeriodApi(req, res, next)
})

router.get('/period/details', async (req: express.Request, res: express.Response, next: any) => {
  getAllPeriodWithDetailsApi(req, res, next)
})

// Priority
router.get('/priority', async (req: express.Request, res: express.Response, next: any) => {
  getAllPriorityApi(req, res, next)
})

// Role
router.get('/roles', async (req: express.Request, res: express.Response, next: any) => {
  getAllRoleApi(req, res, next)
})

module.exports = router