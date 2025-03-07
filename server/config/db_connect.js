import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db_connect=async()=>{

    try{

        await mongoose.connect(process.env.MONGOOSE_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to Mongoose Successfully");

    } catch(error){
        console.error(error.message)
    };

};

export default db_connect;