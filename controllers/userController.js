import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'

const createUser = async (req, res) => {

    try {
        const user = await User.create(req.body);
        console.log('req Body', user)
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
    // console.log('req Body', req.body)
    try {
        const { email, password } = req.body

        // console.log('req.body',req.body);

        const user = await User.findOne({ email })

        
        console.log('user:',user)

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
        console.log('Same2:',same)
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
    console.log('3')
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

const updateUser= async (req,res)=>{
    // console.log('REQ',req.body)
    const { email } = req.body
    try {
        

        const user = await User.findOne({email})

        console.log('REssssss:' ,res)
        console.log('User: ',user)
        console.log('body: ',req.body)
        console.log('cookie:'+req.headers.authorization.trim())
        // console.log('mail:',req.body.email)
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
        console.log(error)
        
        res.status(500).json({
            succeded: false,
            error,
        })
    }

}

const updatePassword= async (req,res,message)=>{
    // console.log('REQ',req.body)
    const { oldPassword,newPassword,email} = req.body
    try {
        

        const user = await User.findOne({email})
        console.log('REssssss:' ,res)
        console.log('User: ',user)
        if(user){
            if(oldPassword===user.password){
                //password update işlemleri
                console.log('old Password',oldPassword)
                console.log('new Password',newPassword)
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
        console.log(error)
        
        res.status(500).json({
            succeded: false,
            error,
        })
    }

}


export { createUser, userLogin,createToken ,updateUser,updatePassword};
