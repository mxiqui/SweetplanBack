import { Router } from "express";
import { buscarOfertasAutomaticoAirbnb, findPlan, findPlanPrueba, getImages } from "../../controllers/PlanController.js";

export const routerPlan = Router();

routerPlan
    .post("/findPlan", findPlan)
    .post("/findPlanAutomatico", buscarOfertasAutomaticoAirbnb)
    .post("/getImages", getImages)
    .post("findFly")
    .get("/findPlan", findPlanPrueba)