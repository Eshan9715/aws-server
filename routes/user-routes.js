import express from "express";
import {addCRDToUser, addConsigneeData, addNotifyData, addSalesmanToUser, addShipperData, getAllUsers, getByIdConsigneeData, getByIdNotifyData, getByIdShipperData, getUser} from "../controllers/user-controller.js";

const router = express.Router();

router.get("/",getAllUsers);
router.get("/:id",getUser);
router.put("/assignTo/:id",addSalesmanToUser);
router.put("/assignCRD/:id",addCRDToUser);
router.get("/shipperData/:id",getByIdShipperData);
router.get("/consigneeData/:id",getByIdConsigneeData);
router.get("/notifyData/:id",getByIdNotifyData);

router.put("/addShipperData/:id",addShipperData);
router.put("/addConsigneeData/:id",addConsigneeData);
router.put("/addNotifyData/:id",addNotifyData);

export default router;