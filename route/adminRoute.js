import express from 'express'
import * as adminController from '../controllers/adminController.js'
import * as authMiddleware from '../middlewares/authMiddleware.js'

const router =express.Router();

router
.route('/login')
.post(adminController.asyncAdminLogin)

router
.route('/user-all')
.post(adminController.asyncGetAllUsers)


router
.route('/user-delete')
.post(adminController.asyncDeleteUser)

router
.route('/product-all')
.post(adminController.asyncGetAllProduct)

router
.route('/product-delete')
.post(adminController.asyncDeleteProduct)

router
.route('/add-editor')
.post(adminController.asyncCreateEditor)

router
.route('/editor-all')
.post(adminController.asyncGetAllEditor)

router
.route('/editor-delete')
.post(adminController.asyncDeleteEditor)






export default router;

