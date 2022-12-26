import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from 'cloudinary'
import nodemailer from 'nodemailer'
import fs from 'fs'


const createProduct = async (req, res,message) => {
    if(req.headers.authorization){

        const result = await cloudinary.uploader.upload(
            req.files.image.tempFilePath,
            {
                use_filename: true,
                folder: 'hireStuff',
            }
        );


        try {

           await Product.create({
                category: req.body.category,
                description: req.body.description,
                productName: req.body.productName,
                phone: req.body.phone,
                price: req.body.price,
                email:res.locals.user.email,
                user:res.locals.user._id,
                url: result.secure_url,
                image_id: result.public_id,

            });
            fs.unlinkSync(req.files.image.tempFilePath)
            res.status(201).json({
                succeded: true,
                message:'Ürün başari ile oluşturuldu',
            });
        } catch (result) {
            res.status(500).json({
                succeded: false,
                message:'Ürün Oluşturulamadi',
                result,
            })
        }

    }
    else{
        res.status(404).json({
            succeded:false,
            message:'Kullanici Bulunamadi',
        })
    }




};

const getProduct= async (req,res)=>{
    try {

        if(req.headers.authorization){
        const product =await Product.find({user:res.locals.user._id})

        res.status(201).json({
            succeded:true,
            data:product,
            user:res.locals.user._id
        })
        }else{
            res.status(404).json({
                succeded:false,
                
            })
        }
     
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }

}
const getAllProduct= async (req,res)=>{

  const user = res.locals.user ? res.locals.user._id : ''
  console.log(user)
  try {

      const tecnology =await Product.find({category:'Teknolojik Aletler'})
      const furniture =await Product.find({category:'Ev Eşyası'})
      const jewerly =await Product.find({category:'Takı'})


      res.status(201).json({
          succeded:true,
          tecnology:tecnology,
          furniture:furniture,
          jewerly:jewerly,
          user:user
      })
   
  } catch (error) {
      res.status(500).json({
          succeded: false,
          error,
      })
  }

}
const getFurniture= async (req,res)=>{

  const user = res.locals.user ? res.locals.user._id : ''
  console.log(user)
  try {

      const furniture =await Product.find({category:'Ev Eşyası'})
      
      res.status(201).json({
          succeded:true,
          furniture:furniture,
          user:user
      })
   
  } catch (error) {
      res.status(500).json({
          succeded: false,
          error,
      })
  }

}
const getTecnology= async (req,res)=>{

  const user = res.locals.user ? res.locals.user._id : ''
  console.log(user)
  try {

      const tecnology =await Product.find({category:'Teknolojik Aletler'})
      
      res.status(201).json({
          succeded:true,
          tecnology:tecnology,
          user:user
      })
   
  } catch (error) {
      res.status(500).json({
          succeded: false,
          error,
      })
  }

}

const getJewerly= async (req,res)=>{

  const user = res.locals.user ? res.locals.user._id : ''
  console.log(user)
  try {

      const jewerly =await Product.find({category:'Takı'})
      
      res.status(201).json({
          succeded:true,
          jewerly:jewerly,
          user:user
      })
   
  } catch (error) {
      res.status(500).json({
          succeded: false,
          error,
      })
  }

}

const deleteProduct=async (req,res)=>{
    const {productID}= req.body;
    try {
        const product = await Product.findById({_id:productID});
        console.log('product',product)
        const productId = product.image_id;
        console.log('productId',productId);

        await cloudinary.uploader.destroy(productId)
        await Product.findByIdAndRemove({ _id: productID })

        res.status(200).json({
            succeded:true,
            message:'product deleted succesfully',
        });

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
}

const productInfo =async(req,res)=>{
    const {data}=req.body
    console.log(req)
    console.log(data)

    try {

        if(req.headers.authorization){
        const product =await Product.findOne({_id:data})
        const userId= product.user
        const user = await User.findOne({_id:userId})
        console.log('product',product)
        console.log("user",user)
        res.status(201).json({
            succeded:true,
            data:product,
            user:user,
        })
        }else{
            res.status(404).json({
                succeded:false,
                
            })
        }
     
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }



}

const sendMail = async (req,res)=>{

   console.log('req.body',req.body)
   
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
                            <p>Name: ${req.body.name}</p>
                            <p>Surname:${req.body.surName}</p>
                            <p>Message: ${req.body.message}</p>
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
            to: req.body.emailTo, // list of receivers
            subject: `MAIL FROM ${req.body.email}`, // Subject line
            html: htmlTemplate, // html body
        });
        res.status(200).json({
            succeeded:true,
          })


       
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }


}


export { createProduct,getProduct,deleteProduct,productInfo,sendMail,getAllProduct,getFurniture,getTecnology,getJewerly }