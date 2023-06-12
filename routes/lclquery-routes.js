import express from "express";
import { addBLLCLQuery, addLCLQuery, addMemberIdeaLCLQuery, addNewRateLCLQuery, addRatesLCLQuery, addScheduleLCLQuery, addShipIdeaLCLQuery, addShipperIdeaLCLQuery, addVesselLCLQuery, alterIsFinalRatLCLQuery, alterIsFinalSchLCLQuery, alterLinelCLQuery, alterStatusLCLQuery, alterStatusRateReply, deleteLCLQuery, getAllLCLQuries, getById, getByUserId, getCurrentLFinal, getLCLBLData, getMemberLastSeenLCLQuery, getRateReply, getRemarks, getShipperLastSeenLCLQuery, saveBLLCLQuery, saveMemberLastSeenLCLQuery, saveShipperLastSeenLCLQuery, updateCurrentLFinal } from "../controllers/lclquery-controller.js";
const lclqueryRouter = express.Router();

lclqueryRouter.post("/add",addLCLQuery);

lclqueryRouter.get("/",getAllLCLQuries);
lclqueryRouter.get("/:id",getById);

lclqueryRouter.delete("/:id",deleteLCLQuery);
lclqueryRouter.get("/user/:id",getByUserId);
lclqueryRouter.get("/getRemarks/:id",getRemarks);
lclqueryRouter.get("/getShipperLastSeen/:id",getShipperLastSeenLCLQuery);
lclqueryRouter.get("/getMemberLastSeen/:id",getMemberLastSeenLCLQuery);
lclqueryRouter.get("/getRateReply/:id",getRateReply);


lclqueryRouter.put("/addRates/:id",addRatesLCLQuery);
lclqueryRouter.put("/addShipIdea/:id",addShipIdeaLCLQuery);
lclqueryRouter.put("/addShipperIdea/:id",addShipperIdeaLCLQuery);
lclqueryRouter.put("/addMemberIdea/:id",addMemberIdeaLCLQuery);

lclqueryRouter.get("/rates/:id/:keyId",getCurrentLFinal);
lclqueryRouter.put("/rates/alterFinal/:id",updateCurrentLFinal);

lclqueryRouter.put("/saveShipperLastSeen/:id",saveShipperLastSeenLCLQuery);
lclqueryRouter.put("/saveMemberLastSeen/:id",saveMemberLastSeenLCLQuery);

lclqueryRouter.put("/alterIsFinalSch/:id",alterIsFinalSchLCLQuery);
lclqueryRouter.put("/alterIsFinalRat/:id",alterIsFinalRatLCLQuery);

lclqueryRouter.put("/alterLine/:id",alterLinelCLQuery);


lclqueryRouter.put("/addNewRate/:id",addNewRateLCLQuery);
lclqueryRouter.put("/alterStatus/:id",alterStatusLCLQuery);
lclqueryRouter.put("/alterStatusRateReply/:id",alterStatusRateReply);
lclqueryRouter.put("/addSchedule/:id",addScheduleLCLQuery);
lclqueryRouter.put("/addVessel/:id",addVesselLCLQuery);

lclqueryRouter.put("/addBLData/:id",addBLLCLQuery);
lclqueryRouter.put("/saveBLData/:id",saveBLLCLQuery);
lclqueryRouter.get("/blLCLData/:id",getLCLBLData);


// 'crd' || 'lcl-crd' || 'salesman'|| 'consolemanager'
// 'user' || 'consoleOperator'
export default lclqueryRouter;

      