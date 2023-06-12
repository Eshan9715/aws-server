import express from "express";
import { addBLFCLQuery, addCutOffFCLQuery, addFCLQuery, addMemberIdeaFCLQuery, addNewRateFCLQuery, addNewScheduleFCLQuery, addRatesFCLQuery, 
    addReleaseFCLQuery, addScheduleFCLQuery,alterIsFinalSchFCLQuery, addShipperIdeaFCLQuery, addVesselFCLQuery, alterLineFCLQuery, 
    alterStatusFCLQuery, alterStatusRateReply, deleteFCLQuery, getAllFCLQuries, getById, getByUserId, getCurrentFinal, getCurrentSchFinal, 
    getCutOffData, getFCLBLData, getFCLRateByID, getMemberLastSeenFCLQuery, getRemarks, getShipperLastSeenFCLQuery, saveBLFCLQuery, 
    saveMemberLastSeenFCLQuery, saveShipperLastSeenFCLQuery, updateCurrentFinal, updateCurrentSchFinal, 
    alterIsFinalRatFCLQuery, 
    getRatesByID,
    getSchedulesByID} from "../controllers/fclquery-controller.js";
    
const fclqueryRouter = express.Router();

fclqueryRouter.post("/add",addFCLQuery);

fclqueryRouter.get("/",getAllFCLQuries);

fclqueryRouter.get("/:id",getById);

fclqueryRouter.get("/rates/:id/:keyId",getCurrentFinal);
fclqueryRouter.get("/rates/:id",getRatesByID);
fclqueryRouter.get("/schedules/:id",getSchedulesByID);


fclqueryRouter.put("/rates/alterFinal/:id",updateCurrentFinal);

fclqueryRouter.get("/schedules/:id/:keyId2",getCurrentSchFinal);
fclqueryRouter.put("/schedules/alterFinal/:id",updateCurrentSchFinal);

fclqueryRouter.delete("/:id",deleteFCLQuery);
fclqueryRouter.get("/user/:id",getByUserId);
fclqueryRouter.get("/getRemarks/:id",getRemarks);
fclqueryRouter.get("/getShipperLastSeen/:id",getShipperLastSeenFCLQuery);
fclqueryRouter.get("/getMemberLastSeen/:id",getMemberLastSeenFCLQuery);


fclqueryRouter.put("/addRates/:id",addRatesFCLQuery);

fclqueryRouter.put("/alterIsFinalSch/:id",alterIsFinalSchFCLQuery);
fclqueryRouter.put("/alterIsFinalRat/:id",alterIsFinalRatFCLQuery);

fclqueryRouter.put("/alterLine/:id",alterLineFCLQuery);

fclqueryRouter.put("/addShipperIdea/:id",addShipperIdeaFCLQuery);
fclqueryRouter.put("/addMemberIdea/:id",addMemberIdeaFCLQuery);

fclqueryRouter.put("/alterStatus/:id",alterStatusFCLQuery);
fclqueryRouter.put("/alterStatusRateReply/:id",alterStatusRateReply);

fclqueryRouter.put("/addNewRate/:id",addNewRateFCLQuery);

fclqueryRouter.put("/saveShipperLastSeen/:id",saveShipperLastSeenFCLQuery);
fclqueryRouter.put("/saveMemberLastSeen/:id",saveMemberLastSeenFCLQuery);


fclqueryRouter.put("/addSchedule/:id",addScheduleFCLQuery);
fclqueryRouter.put("/addNewSchedule/:id",addNewScheduleFCLQuery);

fclqueryRouter.put("/addVessel/:id",addVesselFCLQuery);
// fclqueryRouter.put("/addBookingData/:id",addBookingDataFCLQuery);
fclqueryRouter.put("/addRelease/:id",addReleaseFCLQuery);
fclqueryRouter.put("/addCutOff/:id",addCutOffFCLQuery);

fclqueryRouter.put("/addBLData/:id",addBLFCLQuery);
fclqueryRouter.put("/saveBLData/:id",saveBLFCLQuery);

fclqueryRouter.get("/viewRates/:id",getFCLRateByID);
fclqueryRouter.get("/blFCLData/:id",getFCLBLData);
fclqueryRouter.get("/getCutoffData/:id",getCutOffData);


export default fclqueryRouter;