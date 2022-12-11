import mongoose from "mongoose";
import validator from "validator";

const {Schema} =mongoose;


const userSchema=new Schema({
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
    gender:{
        type:String,

    },
    city:{
        type:String,
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

const User=mongoose.model('User',userSchema)

export default User;
