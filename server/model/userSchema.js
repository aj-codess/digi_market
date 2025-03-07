import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema=new mongoose.Schema({
    _id:false,
    id:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength: 3,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password:{
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true,
    }
},{timestamps: true});


userSchema.methods.matchPassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password);

};



userSchema.methods.toJSON = function () {

    const obj = this.toObject();

    delete obj.password;
    
    return obj;

};


const user_schema=mongoose.model("User",userSchema);

export default user_schema;