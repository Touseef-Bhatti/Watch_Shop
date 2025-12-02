import express from "express"
import { getAdminDashboard } from '../controllers/adminController.js'


const adminRouter = express.Router()


adminRouter.get('/dashboard', getAdminDashboard);

export default adminRouter