import express from 'express'
import * as userController from '../controllers/userController.js'
import * as authMiddleware from '../middlewares/authMiddleware.js'

const router =express.Router();




router
.route('/signup')
.post(userController.createUser)

router
.route('/login')
.post(userController.userLogin)

router
.route('/userinfo')
.post(userController.updateUser)

router
.route('/passwordUpdate')
.put(userController.updatePassword)



export default router;