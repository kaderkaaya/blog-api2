import dotenv from "dotenv";
dotenv.config();
import express from "express";
const PORT = process.env.PORT;
const app = express();
import connectDB from './config/conf.js';
import UserRouter from "./routes/user.js";
import ErrorHandler from "./helpers/errorHandler.js";

app.use(express.json());
connectDB();
app.use(ErrorHandler)
app.use("/user",UserRouter)
app.listen(PORT!, ()=>{
    console.log(`*****************->PORT:${PORT}`);
    
});