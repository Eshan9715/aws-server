import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import user_router from "./routes/user-routes.js";
import rateRouter from './routes/rates-routes.js';
import fclqueryRouter from './routes/fclquery-routes.js';
import lclqueryRouter from './routes/lclquery-routes.js';

import authRouter from './routes/auth-routes.js';
import destinyRouter from './routes/destination-routes.js';
import lineRouter from './routes/line-routes.js';
import memrouter from './routes/member-routes.js';
import hsRouter from './routes/hsCode-routes.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://ec2-43-205-146-103.ap-south-1.compute.amazonaws.com"
}));
dotenv.config();

app.use("/api/user",user_router);
app.use("/api/member",memrouter);
app.use("/api/rate",rateRouter);
app.use("/api/fclquery", fclqueryRouter)
app.use("/api/lclquery", lclqueryRouter)
app.use("/api/destination", destinyRouter)
app.use("/api/line", lineRouter)
app.use("/api/hsCodes", hsRouter)
app.use("/api/auth", authRouter )

const PORT = 8000;

mongoose.set("strictQuery", true)

mongoose.connect("mongodb+srv://FLI-ADMIN:HjQmp9PNIYKf3Ak3@cluster0.arnz5rb.mongodb.net/?retryWrites=true&w=majority")
.then(()=>
    console.log('database connected !!'))
.then(()=>
    app.listen(PORT,()=>console.log(`server is running at ${PORT} !!`)))
.catch((err)=>
    console.log(err));