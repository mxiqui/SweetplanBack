import { Router } from "express";
import { obtenerOfertaPorTipo } from "../../persistence/services/DAO/OfertaDAO.js";
import { obtenerOfertas } from "../../persistence/services/v2/obtenerOfertas.js";
import { saveOffer } from "../../persistence/services/v2/guardarOfertas.js";


export const routerV2 = Router();
routerV2
    .post("/getOfertas/V2", obtenerOfertas)
    .post("/addOferta/V2", saveOffer)