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
    phone:{
        type:String,
        required:true,
        trim:true,
        minlength:10,
        unique:true
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    user_ads:{
        type:[{
            _id:false,
            id:{
                type:String,
                required:true,
                unique:true
            },
            ads_name:{
                type:String,
                required:true,
            },
            ads_description:{
                type:String,
            },
            ads_postedTimestap:{
                type:Date,
                default: Date.now
            }
        }],
        default:[]
    },
    OTP_pin_id:{
        type:String,
        unique:true
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