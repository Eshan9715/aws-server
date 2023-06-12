import express from "express";
import { adddestination, deleteDestination, getAllDestinations,getById } from "../controllers/destination-controller.js";
const destinyRouter = express.Router();

destinyRouter.get("/", getAllDestinations);
destinyRouter.post("/add",adddestination);
destinyRouter.get("/:id",getById);
destinyRouter.delete("/:id",deleteDestination);

export default destinyRouter;