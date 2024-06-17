import { AlojamientoService } from "../persistence/services/AlojamientoService.js"
import { OfertaService } from "../persistence/services/OfertaService.js"
import { VueloService } from "../persistence/services/VueloService.js"


const ofertaService = new OfertaService()
const vueloService = new VueloService()
const alojamientoService = new AlojamientoService()



export const saveOffer = async(req, res) =>{

    const {alojamiento, vuelo, vuelo2, oferta} = req.body;
    const vueloIda = await vueloService.save(vuelo.aerolinea, vuelo.aeropuertoIda, vuelo.aeropuertoVuelta, vuelo.precio, vuelo.horaLlegada, vuelo.horaSalida, vuelo.fecha, vuelo.url);
    const vueloVuelta = await vueloService.save(vuelo2.aerolinea, vuelo2.aeropuertoIda, vuelo2.aeropuertoVuelta, vuelo2.precio, vuelo2.horaLlegada, vuelo2.horaSalida, vuelo2.fecha, vuelo2.url);
    const aloj = await alojamientoService.save(alojamiento.nombre,alojamiento.estrellas, alojamiento.puntuacion, alojamiento.direccion,alojamiento.precio, alojamiento.noches, alojamiento.url, alojamiento.fecha, alojamiento.galeria, alojamiento.company, alojamiento.idCompany);

    const of = await ofertaService.save(
        oferta.destino,
        oferta.origen,
        new Date(oferta.fechaInicio),
        new Date(oferta.fechaFin),
        oferta.imagen,
        oferta.galeria,
        vueloIda.precio + vueloVuelta.precio+ (aloj.precio*aloj.noches),
        oferta.tipo,
        vueloIda.id,
        vueloVuelta.id,
        aloj.id
    );

    console.log("Oferta guardada con exito");
    res.send("Okey");
    
}

export const saveOfferProof = async (req, res) => {
    const vueloIda = await vueloService.save('Ryanair', 'MAD', 'PAR', 200, '08:00', '10:00', '10 Febrero', 'https://www.ryanair.com/es/es/trip/flights/select?adults=1&teens=0&children=0&infants=0&dateOut=2024-06-03&dateIn=2024-06-07&isConnectedFlight=false&discount=0&promoCode=&isReturn=true&originIata=MAD&destinationIata=BVA&tpAdults=1&tpTeens=0&tpChildren=0&tpInfants=0&tpStartDate=2024-06-03&tpEndDate=2024-06-07&tpDiscount=0&tpPromoCode=&tpOriginIata=MAD&tpDestinationIata=BVA');
    const vueloVuelta = await vueloService.save('Ryanair', 'PAR', 'MAD', 250, '12:00', '14:00', '14 Febrero', 'https://www.ryanair.com/es/es/trip/flights/select?adults=1&teens=0&children=0&infants=0&dateOut=2024-06-03&dateIn=2024-06-07&isConnectedFlight=false&discount=0&promoCode=&isReturn=true&originIata=MAD&destinationIata=BVA&tpAdults=1&tpTeens=0&tpChildren=0&tpInfants=0&tpStartDate=2024-06-03&tpEndDate=2024-06-07&tpDiscount=0&tpPromoCode=&tpOriginIata=MAD&tpDestinationIata=BVA');
    const alojamiento = await alojamientoService.save("La posada",3, 8.8, "Calle el prado, Madrid, 8",80.0, 4, "https://google.com", "10 Febrero - 14 Febrero");


    const oferta = await ofertaService.save(
        'Málaga',
        'Madrid',
        new Date('2024-05-01'),
        new Date('2024-05-10'),
        'https://firebasestorage.googleapis.com/v0/b/sweetplan-bf8d1.appspot.com/o/imagenes%2FAsia%2FIndonesia%2Fbali.jpg?alt=media&token=0d2fed20-6e00-4bc7-8891-2ed708cc7279',
        'galeria_url',
        vueloIda.precio + vueloVuelta.precio+ (alojamiento.precio*alojamiento.noches),
        'romantico',
        vueloIda.id,
        vueloVuelta.id,
        alojamiento.id
    );

    console.log(vueloIda.id);
    res.send("Okey");
}
