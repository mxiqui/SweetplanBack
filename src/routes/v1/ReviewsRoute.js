import { Router } from "express";
import { getReviewsBooking, searchReviewsAirbnb } from "../../controllers/ReviewsController.js";


export const routerReviews = Router();


routerReviews
    .post("/getReviewsBooking/", getReviewsBooking)
    .post("/getReviewsAirbnb/", searchReviewsAirbnb)

export default routerReviews
