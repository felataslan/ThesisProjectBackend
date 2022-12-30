import express from 'express'
import * as editorController from '../controllers/editorController.js'

const router =express.Router();

router
.route('/login')
.post(editorController.asyncEditorLogin)

router
.route('/user-all')
.post(editorController.asyncGetAllUsers)


router
.route('/user-delete')
.post(editorController.asyncDeleteUser)

router
.route('/product-all')
.post(editorController.asyncGetAllProduct)

router
.route('/product-delete')
.post(editorController.asyncDeleteProduct)







export default router;

