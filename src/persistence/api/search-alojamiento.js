import fetch  from'node-fetch';
import { adaptadorAlojamiento, adaptadorAlojamientoBooking } from '../../utils/adatptadorFecha.js';

export const searchAlojamientoAirbnb=async(destino, entrada, salida, personas, children, divisa)=>{
    console.log(destino)

    const url = `https://airbnb13.p.rapidapi.com/search-location?location=${destino}&checkin=${entrada}&checkout=${salida}&adults=${personas}&children=${children}&infants=0&pets=0&page=1&currency=${divisa}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.API_AIRBNB,
            'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
        }
    };

    try {
        var alojamientos=[];
        const response = await fetch(url, options);
        const result = await response.json();
        if(result!=null){
            const alojamientosFiltrados = result.results.filter(res => res.type === "Entire rental unit")

        alojamientosFiltrados.forEach(res => {
            if(alojamientos.length<2){
                alojamientos.push(res)
            }else{
                const alojamientosOrdenados = alojamientosFiltrados.sort((a, b) => a.price.rate - b.price.rate);
                if(alojamientos.length<5){
                    alojamientos.push(alojamientosOrdenados[0])
                    alojamientos.push(alojamientosOrdenados[1])
                    alojamientos.push(alojamientosOrdenados[2])
                }
            }
        });
        return await adaptadorAlojamiento(alojamientos);
        }else{
            return 'No hay airbnbs disponibles';
        }
    } catch (error) {
        console.error(error);
        return 'No hay airbnbs disponibles';
    }

}

export const searchAlojamientoBooking=async(divisa, entrada, destino, personas, salida)=>{

    // const url = `https://booking-com.p.rapidapi.com/v2/hotels/search?locale=es&filter_by_currency=${divisa}&checkin_date=${entrada}&dest_type=city&dest_id=${destino}&adults_number=${personas}&checkout_date=${salida}&order_by=popularity&room_number=1&units=metric&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&include_adjacency=true&page_number=0`;

    const url = `https://booking-com.p.rapidapi.com/v1/hotels/search?checkout_date=${salida}&order_by=popularity&filter_by_currency=EUR&room_number=1&dest_id=${destino.id}&dest_type=${destino.type}&adults_number=${personas}&checkin_date=${entrada}&locale=es&units=metric&include_adjacency=true&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&page_number=0`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.API_BOOKING,
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    };

    try {
        const alojamientos=[]
        const response = await fetch(url, options);
        const result = await response.json();

        for(let i=0; i<4; i++){
            alojamientos.push(result.result[i])
        }
        return adaptadorAlojamientoBooking(alojamientos);
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const searchImageBooking= async(id)=>{

    const url = `https://booking-com.p.rapidapi.com/v1/hotels/photos?hotel_id=${id}&locale=en-gb`;
    const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': process.env.API_BOOKING,
        'x-rapidapi-host': 'booking-com.p.rapidapi.com'
    }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        var imagenes =[]

        result.forEach(element => {
            if(imagenes.length>6){
                imagenes.push(element.url_max)
            }
        });
        return imagenes
    } catch (error) {
        return imagenes
    }
}