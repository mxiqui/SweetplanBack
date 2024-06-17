import { Router } from "express";
import { getReviewsBooking, prueba, searchReviewsAirbnb } from "../../controllers/ReviewsController.js";


export const routerReviews = Router();


routerReviews
    .post("/getReviewsBooking/", getReviewsBooking)
    .post("/getReviewsAirbnb/", searchReviewsAirbnb)
    .get("/prueba", prueba)

export default routerReviews
