import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from 'cloudinary'
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
    console.log('req',res.locals)

    try {

        if(req.headers.authorization){
        const product =await Product.find({user:res.locals.user._id})
        console.log('product',product)

        res.status(201).json({
            succeded:true,
            data:product,
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


export { createProduct,getProduct }