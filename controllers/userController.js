import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'

const createUser = async (req, res) => {

    try {
        const user = await User.create(req.body);
        res.status(201).json({
            succeded: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }

};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body


        const user = await User.findOne({ email })

        let same = false
        

        if (user) {
      
            if(password==user.password){
                same=true;
            }


        } else {
            return res.status(401).json({
                succeded: false,
                error: 'There is no such user',
            })
        }
        if (same) {

             
            const token = createToken(user._id);
            
            res.status(200).json({
                user,
                token:token,
            })
           

        }
        else {
            res.status(401).json({
                succeded: false,
                error:'Passwords are not matched',
            })
        }


    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }

};

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

const updateUser= async (req,res)=>{
    
    const { email } = req.body
    try {
        

        const user = await User.findOne({email})

        user.name=req.body.name;
        user.surname=req.body.surname;
        user.userName=req.body.userName;
        user.email=req.body.email;
        user.gender=req.body.gender;
        user.city=req.body.city;
        

        user.save();

        res.status(200).json({
            succeded:true,
            user,
            token:req.headers.authorization,

        })

    } catch (error) {
        console.log('error Update',error)
        
        res.status(500).json({
            succeded: false,
            error,
        })
    }

}

const updatePassword= async (req,res,message)=>{
    const { oldPassword,newPassword,email} = req.body
    try {
        

        const user = await User.findOne({email})
        if(user){
            if(oldPassword===user.password){
                //password update işlemleri
              
                user.password=newPassword


                user.save();
                res.status(200).json({
                    succeded:true,
                    user,
                    token:req.headers.authorization,
                    message:'Password update succesfully',
                })
            }else{
                res.status(401).json({
                    succeded:false,
                    user,
                    message:'Mevcut şifrenizi yanlış girdiniz lütfen şifrenizi kontrol edin',

                })
            }

        }else{
            res.status(401).json({
                succeded:false,
                user,
                message:'Kullanıcı Bulunamadı',
            })
        }


    } catch (error) {
        
        res.status(500).json({
            succeded: false,
            error,
        })
    }

}


export { createUser, userLogin,createToken ,updateUser,updatePassword};
