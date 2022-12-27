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

router
.route('/product/all')
.get(productController.getAllProduct)

router
.route('/product/furniture')
.get(productController.getFurniture)

router
.route('/product/tecnology')
.get(productController.getTecnology)

router
.route('/product/jewerly')
.get(productController.getJewerly)


router
.route('/product/delete')
.post(authMiddleware.authenticateToken,productController.deleteProduct);

router
.route('/product/fillproduct')
.post(productController.productInfo);

router
.route('/product/mail')
.post(productController.sendMail);

export default router;