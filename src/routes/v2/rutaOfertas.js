import { Router } from "express";
import { obtenerAlojamiento, obtenerOfertaPorId, obtenerOfertas } from "../../persistence/services/v2/obtenerOfertas.js";
import { saveOffer } from "../../persistence/services/v2/guardarOfertas.js";


export const routerV2 = Router();
routerV2
    .post("/getOfertas/V2", obtenerOfertas)
    .post("/getOfertaById/V2", obtenerOfertaPorId)
    .post("/getAlojamiento/V2", obtenerAlojamiento)
    .post("/addOferta/V2", saveOffer)