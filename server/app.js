import express from "express";
import dotenv from "dotenv";
import log_router from "./router/log_router.js";

const PORT=process.env.PORT || 3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/login",log_router);