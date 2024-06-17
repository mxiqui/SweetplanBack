import { Router } from "express";
import {getOfferById, getAllOffers, getAlojamientoById} from '../../controllers/offerController.js'
import {saveOffer, saveOfferProof} from "../../controllers/saveOfferController.js";


export const router = Router();



router
    .get("/getAllOffers/:type", getAllOffers)
    .get("/getOfferById/:id", getOfferById)
    .get("/saveOfferProof/", saveOfferProof)
    .post("/saveOffer/", saveOffer)
    .get("/alojamiento/:id", getAlojamientoById)

export default router
