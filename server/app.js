import express from "express";
import dotenv from "dotenv";
import log_router from "./router/log_router.js";
import db_connect from "./config/db_connect.js"

dotenv.config();

db_connect();

const PORT=process.env.ser || 3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/login",log_router);

app.listen(PORT,()=>{

    console.log(`Server is running on http://localhost:${PORT}`);

});