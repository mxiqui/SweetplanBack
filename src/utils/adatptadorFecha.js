import { changeService } from "../persistence/api/ChangeService.js";
import { searchImageBooking } from "../persistence/api/search-alojamiento.js";
import AlojamientoEntity from "../persistence/entities/AlojamientoEntity.js";
import { VueloEntity } from "../persistence/entities/VueloEntity.js";

export const adaptadorFecha=(fecha)=>{
    const partes = fecha.split('T');
    const fechaFormateada = partes[0];
    return fechaFormateada;
}


// export const adaptadorVuelo=(itinerario)=>{
//     console.log(itinerario)

//     if(itinerario!=null && itinerario!= undefined){
//         var vueloIda= new VueloEntity(itinerario.legs[0].carriers.marketing[0].name, 
//             itinerario.legs[0].origin.name, 
//             itinerario.legs[0].destination.name, 
//             itinerario.legs[0].origin.id, 
//             itinerario.legs[0].destination.id, 
//             itinerario.price.raw, 
//             itinerario.legs[0].departure, 
//             itinerario.legs[0].arrival, 
//             itinerario.legs[0].durationInMinutes,
//             itinerario.legs[0].carriers.marketing[0].logoUrl,
//         )

//         var vueloVuelta= new VueloEntity(itinerario.legs[1].carriers.marketing[0].name, 
//             itinerario.legs[1].origin.name, 
//             itinerario.legs[1].destination.name, 
//             itinerario.legs[1].origin.id, 
//             itinerario.legs[1].destination.id, 
//             itinerario.price.raw, 
//             itinerario.legs[1].departure, 
//             itinerario.legs[1].arrival, 
//             itinerario.legs[1].durationInMinutes,
//             itinerario.legs[1].carriers.marketing[0].logoUrl,
//         )

//         return [vueloIda, vueloVuelta]
//     }else{
//         return [null, null]
//     }
    
// }

// export const adaptadorVuelo = (itinerarios) => {
//     var vuelos = [];

//     itinerarios.forEach(itinerario => {
//         console.log(itinerario.price.raw); // Verifica el valor de itinerario.price.raw
//         if (itinerario != null && itinerario != undefined) {
//             var vueloIda = new VueloEntity(
//                 itinerario.legs[0].carriers.marketing[0].name,
//                 itinerario.legs[0].origin.name,
//                 itinerario.legs[0].destination.name,
//                 itinerario.legs[0].origin.id,
//                 itinerario.legs[0].destination.id,
//                 itinerario.price.raw,
//                 itinerario.legs[0].departure,
//                 itinerario.legs[0].arrival,
//                 itinerario.legs[0].durationInMinutes,
//                 itinerario.legs[0].carriers.marketing[0].logoUrl,
//             );

//             var vueloVuelta = new VueloEntity(
//                 itinerario.legs[1].carriers.marketing[0].name,
//                 itinerario.legs[1].origin.name,
//                 itinerario.legs[1].destination.name,
//                 itinerario.legs[1].origin.id,
//                 itinerario.legs[1].destination.id,
//                 itinerario.price.raw,
//                 itinerario.legs[1].departure,
//                 itinerario.legs[1].arrival,
//                 itinerario.legs[1].durationInMinutes,
//                 itinerario.legs[1].carriers.marketing[0].logoUrl,
//             );

//             vuelos.push([vueloIda, vueloVuelta]);
//         }
//     });

//     return vuelos; // Retorna el array vuelos
// }


export const adaptadorVuelo = (itinerarios) => {
    var vuelos = [];

    itinerarios.forEach(itinerario => {
        console.log(itinerario.price.raw); // Verifica el valor de itinerario.price.raw
        if (itinerario != null && itinerario != undefined) {
            var vueloIda = new VueloEntity(
                itinerario.legs[0].carriers.marketing[0].name,
                itinerario.legs[0].origin.name,
                itinerario.legs[0].destination.name,
                itinerario.legs[0].origin.id,
                itinerario.legs[0].destination.id,
                itinerario.price.raw,
                itinerario.legs[0].departure,
                itinerario.legs[0].arrival,
                itinerario.legs[0].durationInMinutes,
                itinerario.legs[0].carriers.marketing[0].logoUrl,
            );

            var vueloVuelta = new VueloEntity(
                itinerario.legs[1].carriers.marketing[0].name,
                itinerario.legs[1].origin.name,
                itinerario.legs[1].destination.name,
                itinerario.legs[1].origin.id,
                itinerario.legs[1].destination.id,
                itinerario.price.raw,
                itinerario.legs[1].departure,
                itinerario.legs[1].arrival,
                itinerario.legs[1].durationInMinutes,
                itinerario.legs[1].carriers.marketing[0].logoUrl,
            );

            vuelos.push([vueloIda, vueloVuelta]);
        }
    });

    return vuelos; // Retorna el array vuelos
}

export const adaptadorVueloAuto = (itinerarios) => {
    var vuelos = [];

    itinerarios.forEach(itinerario => {
        if (itinerario != null && itinerario != undefined) {
            if (Array.isArray(itinerario.tags) && itinerario.tags.length > 0 && itinerario.tags[0] === 'cheapest') {
                var vueloIda = new VueloEntity(
                    itinerario.legs[0].carriers.marketing[0].name,
                    itinerario.legs[0].origin.name,
                    itinerario.legs[0].destination.name,
                    itinerario.legs[0].origin.id,
                    itinerario.legs[0].destination.id,
                    itinerario.price.raw,
                    itinerario.legs[0].departure,
                    itinerario.legs[0].arrival,
                    itinerario.legs[0].durationInMinutes,
                    itinerario.legs[0].carriers.marketing[0].logoUrl,
                );
    
                var vueloVuelta = new VueloEntity(
                    itinerario.legs[1].carriers.marketing[0].name,
                    itinerario.legs[1].origin.name,
                    itinerario.legs[1].destination.name,
                    itinerario.legs[1].origin.id,
                    itinerario.legs[1].destination.id,
                    itinerario.price.raw,
                    itinerario.legs[1].departure,
                    itinerario.legs[1].arrival,
                    itinerario.legs[1].durationInMinutes,
                    itinerario.legs[1].carriers.marketing[0].logoUrl,
                );
    
                vuelos.push(vueloIda);
                vuelos.push(vueloVuelta);
            }
        }
    });

    return vuelos; // Retorna el array vuelos
}



export const adaptadorAlojamiento=async(alojamientos)=>{

    const result=[];

    alojamientos.forEach(alo => {
        var alojamiento= new AlojamientoEntity(
            alo.id,
            alo.name, 
            alo.rating, 
            alo.address,
            alo.price.rate,
            alo.price.total,
            alo.deeplink,
            alo.images
        );
        result.push(alojamiento)
    });
    return result;
}

export const adaptadorAlojamientoBooking = async (alojamientos) => {
    const result = [];
    for (const element of alojamientos) {
        const imagenes = await searchImageBooking(element.id);

        var precioPorNoche=element.composite_price_breakdown.gross_amount_per_night.value;
        var precioTotal=element.price_breakdown.gross_price;

        if(element.currencycode!='EUR'){
            precioPorNoche= await changeService('EUR', element.currencycode, precioPorNoche);
            precioTotal= await changeService('EUR', element.currencycode, precioTotal);
            console.log(precioPorNoche)
        }

        const alojamiento = {
            id: element.hotel_id,
            name: element.hotel_name_trans,
            rating: element.review_score,
            ratingPalabra: element.review_score_word,
            address: element.address,
            precioTotal: precioTotal,
            precio: precioPorNoche,
            link: element.url,
            distanciaCentro: element.distance,
            imagen: element.max_1440_photo_url,
            galeria: imagenes
        };

        result.push(alojamiento);
    }

    return result;
};
