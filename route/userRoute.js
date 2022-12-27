import express from 'express'
import * as userController from '../controllers/userController.js'
import * as authMiddleware from '../middlewares/authMiddleware.js'

const router =express.Router();

router
.route('/signup')
.post(userController.asyncCreateUser)

router
.route('/login')
.post(userController.asyncUserLogin)

router
.route('/forget')
.post(userController.asyncForgetPass)

router
.route('/userinfo')
.post(authMiddleware.asyncAuthenticateToken,userController.asyncUpdateUser)

router
.route('/passwordUpdate')
.put(authMiddleware.asyncAuthenticateToken,userController.asyncUpdatePassword)



export default router;