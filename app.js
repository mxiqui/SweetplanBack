import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {router} from './src/routes/v1/OfferRoute.js'
import { routerPlan } from './src/routes/v1/PlanRoute.js';
import routerAlerts from './src/routes/v1/AlertsRoute.js';
import { routerReviews } from './src/routes/v1/ReviewsRoute.js';
import { AlojamientoService } from './src/persistence/services/AlojamientoService.js';
import { VueloService } from './src/persistence/services/VueloService.js';
import { OfertaService } from './src/persistence/services/OfertaService.js';




const app = express();
const puerto = process.env.PORT || 3001;


dotenv.config();
app.use(cors());

app.use(bodyParser.json());
app.use(router)
app.use(routerPlan)
app.use(routerAlerts)
app.use(routerReviews)







app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
