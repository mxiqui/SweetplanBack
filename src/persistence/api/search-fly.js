import { adaptadorVuelo, adaptadorVueloAuto } from '../../utils/adatptadorFecha.js';
import fetch from 'node-fetch';
const KEYS = [process.env.API_1, process.env.API_2, process.env.API_3, process.env.API_4];



export const searchFly = async (idCityIda, idCityVuelta, fechaIda, fechaVuelta, personas, divisa) => {
    console.log(idCityIda)
    const url = `https://sky-scanner3.p.rapidapi.com/flights/search-roundtrip?fromEntityId=${idCityIda}&toEntityId=${idCityVuelta}&departDate=${fechaIda}&returnDate=${fechaVuelta}&currency=${divisa}&stops=direct%2C1stop%2C2stops&adults=${personas}&cabinClass=economy`;

    const options = (apiKey) => ({
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com'
        }
    });

    for (let i = 0; i < KEYS.length; i++) {
        try {
            const response = await fetch(url, options(KEYS[i]));
            const result = await response.json();

            if (result.message === 'You have exceeded the MONTHLY quota for Requests on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/ntd119/api/sky-scanner3') {
                console.log(`API key ${i + 1} has exceeded the quota, trying next key...`);
                continue;
            } else {
                if (result != null && result.data && result.data.itineraries) {
                    result.data.itineraries.sort((a, b) => a.price.raw - b.price.raw);
                    let res = adaptadorVuelo(result.data.itineraries);
                    return res;
                } else {
                    return 'No hay vuelos disponibles';
                }
            }
        } catch (error) {
            console.error(error);
            return 'No hay vuelos disponibles';
        }
    }

    return 'No hay vuelos disponibles después de probar todas las claves de API';
};




export const searchFlyAuto = async (idCityIda, idCityVuelta, fechaIda, fechaVuelta, personas, divisa) => {
    console.log(idCityIda)
    const url = `https://sky-scanner3.p.rapidapi.com/flights/search-roundtrip?fromEntityId=${idCityIda}&toEntityId=${idCityVuelta}&departDate=${fechaIda}&returnDate=${fechaVuelta}&currency=${divisa}&stops=direct%2C1stop%2C2stops&adults=${personas}&cabinClass=economy`;

    const options = (apiKey) => ({
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com'
        }
    });

    for (let i = 0; i < KEYS.length; i++) {
        try {
            const response = await fetch(url, options(KEYS[i]));
            const result = await response.json();
            console.log(result)

            if (result.message === 'You have exceeded the MONTHLY quota for Requests on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/ntd119/api/sky-scanner3') {
                console.log(`API key ${i + 1} has exceeded the quota, trying next key...`);
                continue;
            } else {
                if (result != null && result.data && result.data.itineraries) {
                    result.data.itineraries.sort((a, b) => a.price.raw - b.price.raw);
                    let res = adaptadorVueloAuto(result.data.itineraries);
                    return res;
                } else {
                    return 'No hay vuelos disponibles';
                }
            }
        } catch (error) {
            console.error(error);
            return 'No hay vuelos disponibles';
        }
    }

    return 'No hay vuelos disponibles después de probar todas las claves de API';
};

