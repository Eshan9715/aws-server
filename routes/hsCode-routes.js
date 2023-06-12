import express from "express";
import { addHSCode, getAllHSCodes, updateHSCode } from "../controllers/hsCode-controllers.js";
const hsRouter = express.Router();

hsRouter.get("/", getAllHSCodes);

hsRouter.post("/add",addHSCode);

// hsRouter.get("/:id",getById);
hsRouter.put("/:id",updateHSCode);


export default hsRouter;