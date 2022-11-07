import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const createUser= async(req,res)=>{
     
    try {
        const user= await User.create(req.body);
        console.log('req Body', user)
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

const userLogin = async (req, res) => {
    // console.log('req Body', req.body)
    try {
        const { email, password } = req.body

        // console.log('req.body',req.body);

        const user = await User.findOne({email})

        console.log(user)
        let same = false

        if (user) {
            same = await bcrypt.compare(password, user.password)
            console.log('Same:',same);
            return res.status(200).json({})


        } else {
          return  res.status(401).json({
                succeded: false,
                error: 'There is no such user',
            })
        }
        if (same) {
            // const token=createToken(user._id);
            // res.cookie('jwt',token,{
            //     httpOnly:true,
            //     maxAge:1000*60*60*24,
            // })
            res.redirect('/');
        }
        else{
            res.status(500).json({
                succeded:false,
                error,
            })
        }


    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }

};


export {createUser,userLogin};
