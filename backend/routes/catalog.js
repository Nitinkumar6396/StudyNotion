import express from 'express'
import { createCategory, deleteCategory, getCategoryPageDetails, showAllCategory } from '../controllers/Category.js'
import { auth, isAdmin } from '../middlewares/auth.js'


const catalogRouter = express.Router()

catalogRouter.post('/createCategory',auth,isAdmin,createCategory)
catalogRouter.get('/getAllCategory',showAllCategory)
catalogRouter.delete('/deleteCategory',auth,isAdmin,deleteCategory)
catalogRouter.get('/catalogPageData', getCategoryPageDetails)

export default catalogRouter