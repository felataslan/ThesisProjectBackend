import express from 'express'
import * as productController from '../controllers/productController.js'

const router=express.Router();

router
.route('/createproduct')
.post(productController.createProduct);



export default router;