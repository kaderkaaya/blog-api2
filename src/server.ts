import dotenv from "dotenv";
dotenv.config();
import express from "express";
const PORT = process.env.PORT;
const app = express();
import connectDB from './config/conf.js';
import UserRouter from "./routes/user.js";
import ErrorHandler from "./helpers/errorHandler.js";
import BlogRouter from "./routes/blog.js";
import CommentRouter from "./routes/comment.js"

app.use(express.json());
//DB
connectDB();
//ERROR_HANDLER
app.use(ErrorHandler);
//ROUTES
app.use("/user",UserRouter);
app.use("/blog",BlogRouter);
app.use("/comment",CommentRouter);
//PORT
app.listen(PORT!, ()=>{
    console.log(`*****************->PORT:${PORT}`);
    
});