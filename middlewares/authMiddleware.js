import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'

// check user id have database by login 
const checkUser =  (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else {
                const user = await User.findById(decodedToken.userId)
                res.locals.user = user
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }

}


// check have token have or not by login system 
const asyncAuthenticateToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (token) {
           jwt.verify(token, process.env.JWT_SECRET, (err) => {
                if (err) {
                    console.log(err.message);
                    res.redirect('/login');
                }
                else {
                    next();
                }
            })
        }
        else {
            res.redirect('/login');
        }

    } catch (error) {
        
        res.status(401).json({
            succeded: false,
            error: 'Not authorized',
        })

    }


}

export { asyncAuthenticateToken, checkUser }