import { Router } from "express";
import { findPlan, findPlanPrueba } from "../../controllers/PlanController.js";

export const routerPlan = Router();

routerPlan
    .post("/findPlan", findPlan)
    .post("findFly")
    .get("/findPlan", findPlanPrueba)