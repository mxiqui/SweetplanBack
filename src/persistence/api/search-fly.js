import { adaptadorVuelo, adaptadorVueloAuto } from '../../utils/adatptadorFecha.js';
import fetch from 'node-fetch';

export const searchFly = async (idCityIda, idCityVuelta, fechaIda, fechaVuelta, personas, divisa) => {
    console.log(idCityIda)
    const url = `https://sky-scanner3.p.rapidapi.com/flights/search-roundtrip?fromEntityId=${idCityIda}&toEntityId=${idCityVuelta}&departDate=${fechaIda}&returnDate=${fechaVuelta}&currency=EUR&stops=direct%2C1stop%2C2stops&adults=${personas}&cabinClass=economy`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': "5b48c0e4c9msh45b3f42c919b5fap124ca3jsn5c5593cadb0a",
            'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result)

        if (result != null && result.data && result.data.itineraries) {
            // Ordenar itinerarios por precio
            result.data.itineraries.sort((a, b) => a.price.raw - b.price.raw);
            let res = adaptadorVuelo(result.data.itineraries);
            return res;
        } else {
            return 'No hay vuelos disponibles';
        }
        return result
    } catch (error) {
        console.error(error);
        return 'No hay vuelos disponibles';
    }
};


export const searchFlyAuto = async (idCityIda, idCityVuelta, fechaIda, fechaVuelta, personas, divisa) => {
    console.log(idCityIda)
    const url = `https://sky-scanner3.p.rapidapi.com/flights/search-roundtrip?fromEntityId=${idCityIda}&toEntityId=${idCityVuelta}&departDate=${fechaIda}&returnDate=${fechaVuelta}&currency=EUR&stops=direct%2C1stop%2C2stops&adults=${personas}&cabinClass=economy`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': "3ac2c335b5mshc10c5f73da443d7p1c16a7jsn52b656f3ea97",
            'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result)

        if (result != null && result.data && result.data.itineraries) {
            // Ordenar itinerarios por precio
            result.data.itineraries.sort((a, b) => a.price.raw - b.price.raw);
            let res = adaptadorVueloAuto(result.data.itineraries);
            return res;
        } else {
            return 'No hay vuelos disponibles';
        }
    } catch (error) {
        console.error(error);
        return 'No hay vuelos disponibles';
    }
};

// export const searchFly = async (idCityIda, idCityVuelta, fechaIda, fechaVuelta, personas, divisa) => {
//     console.log(idCityIda)
    
    
//     const url = `https://skyscanner80.p.rapidapi.com/api/v1/flights/search-roundtrip?fromId=${idCityIda}&toId=${idCityVuelta}&departDate=${fechaIda}&returnDate=${fechaVuelta}&adults=${personas}&cabinClass=economy&currency=EUR&market=US&locale=es-Es`;
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '3ac2c335b5mshc10c5f73da443d7p1c16a7jsn52b656f3ea97',
// 		'x-rapidapi-host': 'skyscanner80.p.rapidapi.com'
// 	}
// };

//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         console.log(result)

//         if (result != null && result.data && result.data.itineraries) {
//             // Ordenar itinerarios por precio
//             result.data.itineraries.sort((a, b) => a.price.raw - b.price.raw);
//             let res = adaptadorVuelo(result.data.itineraries);
//             return res;
//         } else {
//             return 'No hay vuelos disponibles';
//         }
//         return result
//     } catch (error) {
//         console.error(error);
//         return 'No hay vuelos disponibles';
//     }
// };
