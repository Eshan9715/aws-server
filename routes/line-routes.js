import express from "express";
import { addLine, deleteLine, getAllLines, getById } from "../controllers/line-controller.js";
const lineRouter = express.Router();

lineRouter.get("/", getAllLines);
lineRouter.post("/add",addLine);
lineRouter.get("/:id",getById);
lineRouter.delete("/:id",deleteLine);
export default lineRouter;