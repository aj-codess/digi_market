import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import log_router from "./router/log_router.js";
import db_connect from "./config/db_connect.js"
import create2FAApplication from "./config/push_connect.js";
import auth_router from "./middleware/auth_router.js";

dotenv.config();

db_connect();

create2FAApplication();

const PORT=process.env.ser || 3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.SECRET_KEY));

app.use("/login",log_router);
app.use("/",auth_router);

app.listen(PORT,()=>{

    console.log(`Server is running on http://localhost:${PORT}`);

});