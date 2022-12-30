import express from 'express';
import dotenv from 'dotenv';
import conn from './db.js';
import userRoute from './route/userRoute.js'
import productRoute from './route/productRoute.js'
import adminRoute from './route/adminRoute.js'
import editorRoute from './route/editorRoute.js'
import {checkUser} from './middlewares/authMiddleware.js'
import cors from 'cors'
import {v2 as cloudinary}from 'cloudinary'
import fileUpload from 'express-fileupload'


dotenv.config();
cloudinary.config(({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET,
}))

//connection to the DB
conn();

const app = express();
app.use(cors())
const port = process.env.PORT || 3000;

//static files middleware

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({useTempFiles:true}))


// Routes
app.use('*',checkUser)
app.use('/users', userRoute)
app.use('/products',productRoute)
app.use('/admin', adminRoute)
app.use('/editor', editorRoute)







app.listen(port, () => {
  console.log(`Application running on port: ${port}`);
});