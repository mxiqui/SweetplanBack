import fetch  from 'node-fetch';

export const searchId=async (city)=>{

    // const url = `https://skyscanner80.p.rapidapi.com/api/v1/flights/auto-complete?query=${city}&market=ES&locale=es-ES`;
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             'X-RapidAPI-Key': process.env.API_SKYSCANNER,
    //             'X-RapidAPI-Host': 'skyscanner80.p.rapidapi.com'
    //         }
    //     };

    //     try {
    //         const response = await fetch(url, options);
    //         const result = await response.json();

    //         if(result.data[0].id==undefined){
    //             return null;
    //         }else{
    //             console.log("************ Id obtenido: "+city+" -->"+result.data[0].id+" ************")
    //             return result.data[0].id
    //         }
            
    //     } catch (error) {
    //         console.log("************ ERROR "+error+" ************")
    //         return null;
    //     }

    // const url = `https://sky-scanner3.p.rapidapi.com/flights/auto-complete?query=${city}`;
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             'X-RapidAPI-Key': process.env.API_SKYSCANNER,
    //             'X-RapidAPI-Host': 'sky-scanner3.p.rapidapi.com'
    //         }
    //         };

    //     try {

    //         const response = await fetch(url, options);
    //         const result = await response.json();
    //         if(result.data.lenght>0 &&result.data[0].presentation.skyId==undefined){
    //             return null;
    //         }else{
    //             console.log("************ Id obtenido: "+city+" -->"+result.data[0].presentation.skyId+" ************")
    //             return result.data[0].presentation.skyId;
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }

    const url = `https://skyscanner80.p.rapidapi.com/api/v1/flights/auto-complete?query=${city}&market=es&locale=es-ES`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '3ac2c335b5mshc10c5f73da443d7p1c16a7jsn52b656f3ea97',
		'x-rapidapi-host': 'skyscanner80.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
            const result = await response.json();
            if(result.data.lenght>0 &&result.data[0].id==undefined){
                return null;
            }else{
                console.log("************ Id obtenido: "+city+" -->"+result.data[0].id+" ************")
                return result.data[0].id;
            }
} catch (error) {
	console.error(error);
}
    
}


export const searchIdBooking=async(city)=>{
    const url = `https://booking-com.p.rapidapi.com/v1/hotels/locations?name=${city}&locale=es`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5b48c0e4c9msh45b3f42c919b5fap124ca3jsn5c5593cadb0a',
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("************ Id alojamiento obtenido: "+city+" -->"+result[0].dest_id+" ************")
        return {
            id:result[0].dest_id,
            type:result[0].dest_type
        };

    } catch (error) {
        console.log("************ ERROR "+error+" ************")
        return null
    }
}