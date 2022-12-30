import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Editor from "../models/editorModel.js";
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'




const asyncAdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body)

        const admin = await Admin.findOne({ email: email })

        let same = false


        if (admin) {

            if (password == admin.password) {
                same = true;
                console.log('admin', admin)
            }


        } else {
            return res.status(401).json({
                succeded: false,
                error: 'There is no such user',
            })
        }
        if (same) {


            const token = createToken(admin._id);

            res.status(200).json({
                admin,
                token: token,
                isAdmin:true,
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


        const admin = await Admin.findOne({ email: email })

        if (admin) {
            const users = await User.find({})


            res.status(202).json({
                succeded: true,
                users: users,
                isAdmin: true
            })

        } else {

            return res.status(404).json({
                succeded: false,
                message: 'admin bulunamadi'
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
            isAdmin:true,
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


        const admin = await Admin.findOne({ email: email })

        if (admin) {
            const products = await Product.find({})


            res.status(202).json({
                succeded: true,
                users: products,
                isAdmin: true
            })

        } else {

            return res.status(404).json({
                succeded: false,
                message: 'admin bulunamadi'
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
                isAdmin:true
            });
      

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
}

const asyncCreateEditor = async (req, res) => {

    try {
        const editor = await Editor.create(req.body);
        res.status(201).json({
            succeded: true,
            isAdmin:true,
            editor,

        });
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }

};
const asyncGetAllEditor = async (req, res) => {
    try {
        const { email } = req.body


        const admin = await Admin.findOne({ email: email })

        if (admin) {
            const editors = await Editor.find({})


            res.status(202).json({
                succeded: true,
                editors: editors,
                isAdmin: true
            })

        } else {

            return res.status(404).json({
                succeded: false,
                message: 'admin bulunamadi'
            })

        }

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

const asyncDeleteEditor = async (req, res) => {

    const { editorId } = req.body;
    try {
        const editor = await Editor.findById({ _id: editorId });
        console.log('editor', editor)
        await Editor.findByIdAndRemove({ _id: editorId })

        res.status(200).json({
            succeded: true,
            message: `${editor.userName} kullanıcı isimli editor silindi.`,
            isAdmin:  true
        });

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
}


export { asyncAdminLogin, asyncGetAllUsers, asyncDeleteUser,asyncDeleteProduct,asyncGetAllProduct,asyncCreateEditor,asyncGetAllEditor,asyncDeleteEditor };