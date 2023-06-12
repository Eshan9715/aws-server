import express from "express";
import {FindUser, login, signup } from "../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/signup",signup);
authRouter.post("/login",login);
authRouter.get("/findUser",FindUser);


export default authRouter;