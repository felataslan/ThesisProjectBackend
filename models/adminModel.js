import mongoose from "mongoose";
import validator from "validator";

const {Schema} =mongoose;


const adminSchema=new Schema({
    name:{
        type:String,   
    },
    surname:{
        type:String,
    },
    userName:{
        type:String,
        required:[true,'Username area is required'],
        lowercase:true,
        validator:[validator.isAlphanumeric,'Only alphanumeric characters']
    },
    email:{
        type:String,
        required:[true,'Email area is required'],
        unique:true,
        validate:[validator.isEmail,'Valid email is required'],

    },
    password:{
        type:String,
        required:[true,'Password  area is required'],
        minLength:[8,'At least 8 characters'],
    },

},
{
    timestamps:true,
}
);

const Admin=mongoose.model('Admin',adminSchema)

export default Admin;
