import { adaptadorVuelo } from '../../utils/adatptadorFecha.js';
import fetch from 'node-fetch';

export const searchFly = async (idCityIda, idCityVuelta, fechaIda, fechaVuelta, personas, divisa) => {
    const url = `https://sky-scanner3.p.rapidapi.com/flights/search-roundtrip?fromEntityId=${idCityIda}&toEntityId=${idCityVuelta}&departDate=${fechaIda}&returnDate=${fechaVuelta}&currency=EUR&stops=direct%2C1stop%2C2stops&adults=${personas}&cabinClass=economy`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.API_SKYSCANNER,
            'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com'
        }
    };

    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);

            if (result != null && result.data && result.message === "Successful") {
                // Ordenar itinerarios por precio
                result.data.itineraries.sort((a, b) => a.price.raw - b.price.raw);
                let res = adaptadorVuelo(result.data.itineraries);
                return res;
            } else {
                attempts++;
                console.log(`Intento ${attempts} fallido. Reintentando...`);
            }
        } catch (error) {
            console.error(error);
            attempts++;
            console.log(`Error en el intento ${attempts}. Reintentando...`);
        }
    }

    return 'No hay vuelos disponibles';
};