import express from "express";
import { addCRDToSalesman, getAllMembers, getMember } from "../controllers/member-controller.js";

const memrouter = express.Router();

memrouter.get("/",getAllMembers);
memrouter.get("/:id",getMember);
memrouter.put("/assignCRD/:id",addCRDToSalesman);


export default memrouter;