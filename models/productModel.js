import mongoose from "mongoose";
import validator from "validator";

const {Schema}= mongoose;

const productSchema= new Schema({
    category:{
        type:String,
    },
    description:{
        type:String,
    },
    productName:{
        type:String,
    },
    phone:{
        type:String,

    },
    price:{
        type:String,

    },
    uploadedAt:{
        type:Date,
        default:Date.now,    
    },
    // user:{
    //     type:Schema.Types.ObjectId,
    //     ref:'User',
    // },
    url:{
        type:String,
        required:true,

    },
    image_id:{
        type:String,
    }

})

const Product =mongoose.model('Product',productSchema);

export default Product;