import express from 'express';
import dotenv from 'dotenv';
import conn from './db.js';
import userRoute from './route/userRoute.js'
import cookieParser from 'cookie-parser';
import {checkUser} from './middlewares/authMiddleware.js'
// import pageRoute from './route/pageRoute.js'
import cors from 'cors'



dotenv.config();

//connection to the DB
conn();

const app = express();
app.use(cors())
const port = process.env.PORT || 3000;

// //ejs template engine
// app.set('view engine', 'ejs');

//static files middleware

app.use(express.static('public'));
app.use(express.json())
// app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))


// Routes
// app.use('*',checkUser)
app.use('/users', userRoute)






app.listen(port, () => {
  console.log(`Application running on port: ${port}`);
});