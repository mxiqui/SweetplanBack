import { Router } from "express";
import { findPlan, findPlanPrueba, getImages } from "../../controllers/PlanController.js";

export const routerPlan = Router();

routerPlan
    .post("/findPlan", findPlan)
    .post("/getImages", getImages)
    .post("findFly")
    .get("/findPlan", findPlanPrueba)