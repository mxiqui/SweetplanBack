import axios from 'axios';


export const getReviewsBooking = async(req, res) => {
    const id = req.body.id;

    console.log("*******************************************************************")

    const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/reviews',
        params: {
            locale: 'es',
            sort_type: 'SORT_MOST_RELEVANT',
            hotel_id: id,
            customer_type: 'solo_traveller,review_category_group_of_friends',
            language_filter: 'en-gb,de,fr'
        },
        headers: {
            'X-RapidAPI-Key': process.env.API_BOOKING,
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.send(response.data)
    } catch (error) {
        console.error(error);
    }
    
}


export const searchReviewsAirbnb = async(req, res) =>{

    const id = req.body.id;
    console.log(id)

    const options = {
        method: 'GET',
        url: 'https://airbnb-search.p.rapidapi.com/property/reviews',
        params: {id: id},
        headers: {
            'X-RapidAPI-Key':process.env.API_BOOKING,
            'X-RapidAPI-Host': 'airbnb-search.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.send(response.data)
    } catch (error) {
        console.error(error);
    }

}


export const prueba = async(req, res) => {
    res.send("Holaa")
    
}
