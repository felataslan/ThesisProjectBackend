import express from "express";
import { getHomePage,getLoginPage,getSignUpPage } from "../controllers/pageContoller.js";


const router =express.Router();


router.route('/').get(getHomePage);
router.route('/signup').get(getSignUpPage);
router.route('/login').get(getLoginPage);


export default router;

