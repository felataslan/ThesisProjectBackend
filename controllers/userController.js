import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const createUser= async(req,res)=>{
    // console.log('req Body', req.body)
    try {
        const user= await User.create(req.body);
    res.status(201).json({
        succeded:true,
        user,
    });
    } catch (error) {
        res.status(500).json({
            succeded:false,
            error
        })
    }
    
};

export {createUser};
