import express from 'express'
import * as userController from '../controllers/userController.js'

const router =express.Router();




router
.route('/signup')
.post(userController.createUser)

router
.route('/login')
.post(userController.userLogin)



export default router;