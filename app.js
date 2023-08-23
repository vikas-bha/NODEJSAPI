import express from "express";
import mongoose from "mongoose";
import UserRouter from "./routes/user.js"
import TaskRouter from "./routes/task.js";
import {config} from "dotenv"
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors"
export const app = express();

config({path:'./data/config.env', })

// using middleware




app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,

}))
app.use("/api/v1/users",UserRouter);
app.use("/api/v1/tasks", TaskRouter);



const schema = new mongoose.Schema({
    name : String,
    email : String,
    password: String
})

// const User = mongoose.model("Users", schema)

app.get("/",(req,res)=>{

    res.send("nioce")
})


// Using Error Middleware
app.use(errorMiddleware);







