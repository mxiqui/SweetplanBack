import { Router } from "express";
import { saveEmail } from "../../controllers/subscribeController.js";


export const routerAlerts = Router();


routerAlerts
    .post("/saveEmail/", saveEmail)

export default routerAlerts
