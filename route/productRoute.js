import express from 'express'
import * as productController from '../controllers/productController.js'
import * as authMiddleware from '../middlewares/authMiddleware.js'

const router=express.Router();

router
.route('/product')
.post(authMiddleware.authenticateToken,productController.createProduct);

router
.route('/product')
.get(authMiddleware.authenticateToken,productController.getProduct)



export default router;