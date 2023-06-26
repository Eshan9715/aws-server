import express from "express";
import { addCRDToSalesman, changeMemberRole, getAllMembers, getMember } from "../controllers/member-controller.js";

const memrouter = express.Router();

memrouter.get("/",getAllMembers);
memrouter.get("/:id",getMember);
memrouter.put("/assignCRD/:id",addCRDToSalesman);
memrouter.put("/changeRole/:id",changeMemberRole);



export default memrouter;