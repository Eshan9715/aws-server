import express from "express";
import { addRate, deleteRate, getAllRates, getById, getByUserId } from "../controllers/rates-controller.js";
const rateRouter = express.Router();

rateRouter.get("/", getAllRates);
rateRouter.post("/add",addRate);
rateRouter.get("/:id",getById);
rateRouter.delete("/:id",deleteRate);
rateRouter.get("/user/:id", getByUserId);

export default rateRouter;