import {render} from 'ejs'
// import User from '../models/userModel.js'




const getHomePage = async (req, res) => {
  
      res.render('HomePage', {
          link: 'homepage',
  
      });
  }



const getSignUpPage = (req, res) => {
    res.render('SignUp', {
        link: 'signup',
    });
}

// render Login page
const getLoginPage = (req, res) => {
    res.render('Login', {
        link: 'login',
    });
}

export {getHomePage,getLoginPage,getSignUpPage}