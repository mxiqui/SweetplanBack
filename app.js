import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {router} from './src/routes/v1/OfferRoute.js'
import { routerPlan } from './src/routes/v1/PlanRoute.js';
import routerAlerts from './src/routes/v1/AlertsRoute.js';
import { routerReviews } from './src/routes/v1/ReviewsRoute.js';
import routerPrueba from './src/routes/testRouter.js';
import { routerV2 } from './src/routes/v2/rutaOfertas.js';




const app = express();
const puerto = process.env.PORT || 3001;


dotenv.config();
app.use(cors());

app.use(bodyParser.json());
app.use(router)
app.use(routerV2)
app.use(routerPrueba)
app.use(routerPlan)
app.use(routerAlerts)
app.use(routerReviews)







app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
