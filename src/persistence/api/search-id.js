import fetch from 'node-fetch';

const KEYS = [process.env.API_1, process.env.API_2, process.env.API_3, process.env.API_4];

export const searchId = async (city) => {
    const url = `https://sky-scanner3.p.rapidapi.com/flights/auto-complete?query=${city}`;
    
    const getOptions = (apiKey) => ({
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'sky-scanner3.p.rapidapi.com'
        }
    });

    for (let i = 0; i < KEYS.length; i++) {
        console.log(process.env.API_1)
        try {
            const response = await fetch(url, getOptions(KEYS[i]));
            const result = await response.json();

            if (result.message && result.message.includes('You have exceeded the MONTHLY quota')) {
                console.log(`API key ${i + 1} has exceeded the quota, trying next key...`);
                continue;
            }

            if (result.data.length > 0 && result.data[0].presentation.skyId !== undefined) {
                console.log(`************ Id obtenido: ${city} --> ${result.data[0].presentation.skyId} ************`);
                return result.data[0].presentation.skyId;
            } else {
                return null;
            }
        } catch (error) {
            console.error(`Error with API key ${i + 1}:`, error);
        }
    }

    return null;
};



export const searchIdBooking = async (city) => {
    console.log("hdhdhhdd"+city)
    const url = `https://booking-com.p.rapidapi.com/v1/hotels/locations?name=${city}&locale=es`;
    
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

            if (result.length > 0) {
                console.log(`************ Id alojamiento obtenido: ${city} --> ${result[0].dest_id} ************`);
                return {
                    id: result[0].dest_id,
                    type: result[0].dest_type
                };
            } else {
                return null;
            }
        } catch (error) {
            console.error(`Error with API key ${i + 1}:`, error);
        }
    }

    return null;
};