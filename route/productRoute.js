import express from 'express'
import * as productController from '../controllers/productController.js'
import * as authMiddleware from '../middlewares/authMiddleware.js'

const router=express.Router();

router
.route('/product')
.post(authMiddleware.asyncAuthenticateToken,productController.asyncCreateProduct);

router
.route('/product')
.get(authMiddleware.asyncAuthenticateToken,productController.asyncGetProduct)

router
.route('/product/all')
.get(productController.asyncGetAllProduct)

router
.route('/product/furniture')
.get(productController.asyncGetFurniture)

router
.route('/product/tecnology')
.get(productController.asyncGetTecnology)

router
.route('/product/jewerly')
.get(productController.asyncGetJewerly)


router
.route('/product/delete')
.post(authMiddleware.asyncAuthenticateToken,productController.asyncDeleteProduct);

router
.route('/product/fillproduct')
.post(productController.asyncProductInfo);

router
.route('/product/mail')
.post(productController.asyncSendMail);

export default router;