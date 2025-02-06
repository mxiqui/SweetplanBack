import fetch from 'node-fetch';
import { adaptadorAlojamiento, adaptadorAlojamientoBooking } from '../../utils/adatptadorFecha.js';

const KEYS = [process.env.API_1, process.env.API_2, process.env.API_3, process.env.API_4];

export const searchAlojamientoAirbnb = async (destino, entrada, salida, personas, children, divisa) => {

    const url = `https://airbnb13.p.rapidapi.com/search-location?location=${destino}&checkin=${entrada}&checkout=${salida}&adults=${personas}&children=${children}&infants=0&pets=0&page=1&currency=${divisa}`;
    
    const getOptions = (apiKey) => ({
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
        }
    });

    for (let i = 0; i < KEYS.length; i++) {
        try {
            var alojamientos = [];
            const response = await fetch(url, getOptions(KEYS[i]));
            const result = await response.json();

            if (result.message && result.message.includes('You have exceeded the MONTHLY quota')) {
                console.log(`API key ${i + 1} has exceeded the quota, trying next key...`);
                continue;
            }

            if (result != null) {
                const alojamientosFiltrados = result.results.filter(res => res.type === "Entire rental unit");

                alojamientosFiltrados.forEach(res => {
                    if (alojamientos.length < 2) {
                        alojamientos.push(res);
                    } else {
                        const alojamientosOrdenados = alojamientosFiltrados.sort((a, b) => a.price.rate - b.price.rate);
                        if (alojamientos.length < 5) {
                            alojamientos.push(alojamientosOrdenados[0]);
                            alojamientos.push(alojamientosOrdenados[1]);
                            alojamientos.push(alojamientosOrdenados[2]);
                        }
                    }
                });

                return await adaptadorAlojamiento(alojamientos);
            } else {
                return 'No hay airbnbs disponibles';
            }
        } catch (error) {
            console.error(`Error with API key ${i + 1}:`, error);
        }
    }

    return 'No hay airbnbs disponibles después de probar todas las claves de API';
};



export const searchAlojamientoAirbnbAuto = async (destino, entrada, salida, personas, children, divisa) => {
    console.log(destino);

    const url = `https://airbnb13.p.rapidapi.com/search-location?location=${destino}&checkin=${entrada}&checkout=${salida}&adults=${personas}&children=${children}&infants=0&pets=0&page=1&currency=${divisa}`;
    
    const getOptions = (apiKey) => ({
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
        }
    });

    for (let i = 0; i < KEYS.length; i++) {
        try {
            const response = await fetch(url, getOptions(KEYS[i]));
            const result = await response.json();

            if (result.message && result.message.includes('You have exceeded the MONTHLY quota')) {
                console.log(`API key ${i + 1} has exceeded the quota, trying next key...`);
                continue;
            }

            if (result != null) {
                const alojamientosFiltrados1 = result.results.filter(res => res.type === "Entire rental unit");
                const alojamientosFiltrados = alojamientosFiltrados1.sort((a, b) => a.price.rate - b.price.rate);
                if (alojamientosFiltrados.length > 0) {
                    return alojamientosFiltrados[0];
                } else {
                    return 'No hay airbnbs disponibles';
                }
            } else {
                return 'No hay airbnbs disponibles';
            }
        } catch (error) {
            console.error(`Error with API key ${i + 1}:`, error);
        }
    }

    return 'No hay airbnbs disponibles después de probar todas las claves de API';
};


export const searchAlojamientoBooking = async (divisa, entrada, destino, personas, salida) => {
    const url = `https://booking-com.p.rapidapi.com/v1/hotels/search?checkout_date=${salida}&order_by=popularity&filter_by_currency=EUR&room_number=1&dest_id=${destino.id}&dest_type=${destino.type}&adults_number=${personas}&checkin_date=${entrada}&locale=es&units=metric&include_adjacency=true&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&page_number=0`;

    const getOptions = (apiKey) => ({
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    });

    for (let i = 0; i < KEYS.length; i++) {
        try {
            const response = await fetch(url, getOptions(KEYS[i]));
            const result = await response.json();

            if (result.message && result.message.includes('You have exceeded the MONTHLY quota')) {
                console.log(`API key ${i + 1} has exceeded the quota, trying next key...`);
                continue;
            }

            if (result && result.result) {
                const alojamientos = result.result.slice(0, 4); // Obtiene los primeros 4 alojamientos
                return adaptadorAlojamientoBooking(alojamientos);
            } else {
                return 'No hay alojamientos disponibles';
            }
        } catch (error) {
            console.error(`Error with API key ${i + 1}:`, error);
        }
    }

    return 'No hay alojamientos disponibles después de probar todas las claves de API';
};



export const searchAlojamientoBookingAuto = async (divisa, entrada, destino, personas, salida, filtros) => {
    let filtro;
    switch (filtros) {
        case "pension_completa":
            filtro = 'class::2,class::4,free_cancellation::1,mealplan::3,distance::city_center';
            break;
        case "solo_desayuno":
            filtro = 'class::2,class::4,free_cancellation::1,mealplan::1,distance::city_center';
            break;
        case "solo_alojamiento":
        default:
            filtro = 'class::2,class::4,free_cancellation::1,distance::city_center';
            break;
    }

    const getOptions = (apiKey) => ({
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    });

    const url = `https://booking-com.p.rapidapi.com/v1/hotels/search?checkout_date=${salida}&order_by=popularity&filter_by_currency=EUR&include_adjacency=true&categories_filter_ids=${filtro}&room_number=1&dest_id=${destino.id}&dest_type=${destino.type}&adults_number=${personas}&page_number=0&checkin_date=${entrada}&locale=en-gb&units=metric`;

    for (let i = 0; i < KEYS.length; i++) {
        try {
            const response = await fetch(url, getOptions(KEYS[i]));
            const result = await response.json();

            if (result.message && result.message.includes('You have exceeded the MONTHLY quota')) {
                console.log(`API key ${i + 1} has exceeded the quota, trying next key...`);
                continue;
            }

            if (result && result.result && result.result.length > 0) {
                return result.result[0]; // Return the first result
            } else {
                return 'No hay alojamientos disponibles';
            }
        } catch (error) {
            console.error(`Error with API key ${i + 1}:`, error);
        }
    }

    return 'No hay alojamientos disponibles después de probar todas las claves de API';
};



export const searchImageBooking = async (id) => {
    const url = `https://booking-com.p.rapidapi.com/v1/hotels/photos?hotel_id=${id}&locale=en-gb`;

    const getOptions = (apiKey) => ({
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'booking-com.p.rapidapi.com'
        }
    });

    for (let i = 0; i < KEYS.length; i++) {
        try {
            const response = await fetch(url, getOptions(KEYS[i]));
            const result = await response.json();

            if (result.message && result.message.includes('You have exceeded the MONTHLY quota')) {
                console.log(`API key ${i + 1} has exceeded the quota, trying next key...`);
                continue;
            }

            let imagenes = "";

            if (result.result && result.result.length > 0) {
                for (let j = 0; j < Math.min(result.result.length, 7); j++) {
                    imagenes += result.result[j].url_max + ";";
                }
            }

            console.log(`Imágenes obtenidas con API key ${i + 1}: ${imagenes.length}`);
            return imagenes;
        } catch (error) {
            console.error(`Error with API key ${i + 1}:`, error);
        }
    }

    return ""; // Si ninguna clave de API tiene éxito
};