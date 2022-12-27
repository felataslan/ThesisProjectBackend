import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'


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
const forgetPass = async (req, res) => {

    const {email} = req.body


    const user = await User.findOne({ email })
    console.log(user)
    const htmlTemplate = `
            <!doctype html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>Simple Transactional Email</title>
                <style>
                  /* -------------------------------------
                      GLOBAL RESETS
                  ------------------------------------- */
                  
                  /*All the styling goes here*/
                  
                  img {
                    border: none;
                    -ms-interpolation-mode: bicubic;
                    max-width: 100%; 
                  }
            
                  body {
                    background-color: #f6f6f6;
                    font-family: sans-serif;
                    -webkit-font-smoothing: antialiased;
                    font-size: 14px;
                    line-height: 1.4;
                    margin: 0;
                    padding: 0;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%; 
                  }
            
                  table {
                    border-collapse: separate;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    width: 100%; }
                    table td {
                      font-family: sans-serif;
                      font-size: 14px;
                      vertical-align: top; 
                  }
            
                  /* -------------------------------------
                      BODY & CONTAINER
                  ------------------------------------- */
            
                  .body {
                    background-color: #f6f6f6;
                    width: 100%; 
                  }
            
                  /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
                  .container {
                    display: block;
                    margin: 0 auto !important;
                    /* makes it centered */
                    max-width: 580px;
                    padding: 10px;
                    width: 580px; 
                  }
            
                  /* This should also be a block element, so that it will fill 100% of the .container */
                  .content {
                    box-sizing: border-box;
                    display: block;
                    margin: 0 auto;
                    max-width: 580px;
                    padding: 10px; 
                  }
            
                  /* -------------------------------------
                      HEADER, FOOTER, MAIN
                  ------------------------------------- */
                  .main {
                    background: #ffffff;
                    border-radius: 3px;
                    width: 100%; 
                  }
            
                  .wrapper {
                    box-sizing: border-box;
                    padding: 20px; 
                  }
            
                  .content-block {
                    padding-bottom: 10px;
                    padding-top: 10px;
                  }
            
            
                </style>
              </head>
              <body>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
                  <tr>
                    <td>&nbsp;</td>
                    <td class="container">
                      <div class="content">
            
                        <!-- START CENTERED WHITE CONTAINER -->
                        <table role="presentation" class="main">
            
                          <!-- START MAIN CONTENT AREA -->
                          <tr>
                            <td class="wrapper">
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td>
                                    <p>Email: ${req.body.email}</p>
                                    <p>Password: ${user.password}</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
            
                        <!-- END MAIN CONTENT AREA -->
                        </table>
                        <!-- END CENTERED WHITE CONTAINER -->
            
            
                      </div>
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                </table>
              </body>
            </html>
            `;
    
    try {
       
        if (user) {
           
             // create reusable transporter object using the default SMTP transport
           let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.NODE_MAIL, // generated ethereal user
                pass: process.env.NODE_PASS, // generated ethereal password
            },
        });

        await transporter.sendMail({
            to: email, // list of receivers
            subject: `MAIL FROM ${process.env.NODE_MAIL}`, // Subject line
            html: htmlTemplate, // html body
        });
      return  res.status(200).json({
            succeded:true,

          })
            


        } else {
            return res.status(401).json({
                succeded: false,
                error: 'There is no such user',
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


export { createUser, userLogin,createToken ,updateUser,updatePassword,forgetPass};
