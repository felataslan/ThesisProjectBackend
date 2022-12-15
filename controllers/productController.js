import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'


const createProduct = async (req, res,message) => {

//     const {email}=req.body;


//   const user= await User.findOne({email})

    // console.log('if bloğu');
    // console.log('user',user)
    if(req.headers.authorization){

        const result = await cloudinary.uploader.upload(
            req.files.image.tempFilePath,
            {
                use_filename: true,
                folder: 'hireStuff',
            }
        );

        console.log('result',result);

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

export { createProduct }