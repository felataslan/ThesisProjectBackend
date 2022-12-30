import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Editor from "../models/editorModel.js";
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'




const asyncEditorLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body)

        const editor = await Editor.findOne({ email: email })

        let same = false
        console.log(editor)

        if (editor) {

            if (password == editor.password) {
                same = true;
                console.log('editor', editor)
            }


        } else {
            return res.status(401).json({
                succeded: false,
                error: 'There is no such user',
            })
        }
        if (same) {


            const token = createToken(editor._id);

            res.status(200).json({
                editor,
                token: token,
                isEditor: true

            })


        }
        else {
            res.status(401).json({
                succeded: false,
                error: 'Passwords are not matched',
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

const asyncGetAllUsers = async (req, res) => {
    try {
        const { email } = req.body


        const editor = await Editor.findOne({ email: email })

        if (editor) {
            const users = await User.find({})


            res.status(202).json({
                succeded: true,
                users: users,
                isEditor: true

            })

        } else {

            return res.status(404).json({
                succeded: false,
                message: 'editor bulunamadi'
            })

        }

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

const asyncDeleteUser = async (req, res) => {

    const { userId } = req.body;
    try {
        const user = await User.findById({ _id: userId });
        console.log('user', user)
        await User.findByIdAndRemove({ _id: userId })

        res.status(200).json({
            succeded: true,
            message: `${user.userName} kullanıcı isimli kullanıcı silindi.`,
            isEditor: true

        });

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
}

const asyncGetAllProduct = async (req, res) => {
    try {
        const { email } = req.body


        const editor = await Editor.findOne({ email: email })

        if (editor) {
            const products = await Product.find({})


            res.status(202).json({
                succeded: true,
                users: products,
                isEditor: true
            })

        } else {

            return res.status(404).json({
                succeded: false,
                message: 'editor bulunamadi'
            })

        }

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

const asyncDeleteProduct = async (req, res) => {
    const { productID } = req.body;

    try {
        
            const product = await Product.findById({ _id: productID });
            console.log('product', product)
            const productId = product.image_id;
            console.log('productId', productId);

            await cloudinary.uploader.destroy(productId)
            await Product.findByIdAndRemove({ _id: productID })

            res.status(200).json({
                succeded: true,
                message: `${productId} id numaralı ürün siteden kaldırılmıştır`,
                isEditor:true
            });
      

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
}




export { asyncEditorLogin, asyncGetAllUsers, asyncDeleteUser,asyncDeleteProduct,asyncGetAllProduct };