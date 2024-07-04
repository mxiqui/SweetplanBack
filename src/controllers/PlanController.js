import { searchAlojamientoBooking, searchAlojamientoAirbnb, searchImageBooking, searchAlojamientoAirbnbAuto } from "../persistence/api/search-alojamiento.js";
import { searchFly, searchFlyAuto } from "../persistence/api/search-fly.js";
import { searchId, searchIdBooking } from "../persistence/api/search-id.js";
import { saveAlojamientoV2 } from "../persistence/services/DAO/AlojamientoV2.js";
import { adaptadorFecha } from "../utils/adatptadorFecha.js";
import {saveVueloV2} from '../persistence/services/DAO/VueloDao.js'
import {saveOfertaV2} from '../persistence/services/DAO/OfertaDAO.js'


export const findPlan= async(req, res)=>{
    console.log("****************** Acceso ruta findPlan ******************")
    const { origen, personas, destino, fecha_ida, fecha_vuelta } = req.body;
    // const origen="Madrid", personas="2", destino="Ibiza", fecha_ida="2024-07-17", fecha_vuelta="2024-07-24"
    // console.log(origen, personas, destino, fecha_ida, fecha_vuelta)
    
    const ida_formateada= adaptadorFecha(fecha_ida);
    const vuelta_formateada= adaptadorFecha(fecha_vuelta);
    const originCity= await searchId(origen);
    const destinationCity= await searchId(destino);
    const cityIdBooking = await searchIdBooking(destino)



    console.log("************ Consultando los vuelos: "+`{${origen}, ${destino}, ${fecha_ida}, ${fecha_vuelta}, ${personas}} ************`)
    var resultadoVuelos= await searchFly(originCity, destinationCity, fecha_ida, fecha_vuelta, personas, 'EUR')
    console.log(`************ Vuelos obtenidos ************`+ resultadoVuelos)

    console.log("************ Consultando los Alojamientos Airbnb: "+`{${origen}, ${destino}, ${fecha_ida}, ${fecha_vuelta}, ${personas}} ************`)
    var resultadoAlojamientosAir=await searchAlojamientoAirbnb(destino, ida_formateada,vuelta_formateada, personas, 0, 'EUR' )
    console.log(`************ Alojamientos obtenidos ************`+ resultadoAlojamientosAir)

    console.log("************ Consultando los Alojamientos Booking: "+`{${origen}, ${destino}, ${fecha_ida}, ${fecha_vuelta}, ${personas}} ************`)
    var resultadoAlojamientosBook= await searchAlojamientoBooking('EUR', ida_formateada, cityIdBooking, personas, vuelta_formateada)
    console.log(`************ Alojamientos obtenidos ************`+ resultadoAlojamientosBook)

    const finalRes={
        vuelos: resultadoVuelos,
        airbnb: resultadoAlojamientosAir,
        booking:resultadoAlojamientosBook,
        datos: {origen: origen, destino: destino, personas:personas, fecha_ida:fecha_ida, fecha_vuelta:fecha_vuelta}
    }

     res.send(finalRes)

}

export const findPlanPrueba=async (req, res)=>{
    const { origen, personas, destino, fecha_ida, fecha_vuelta } = req.body;
    var resultadoVuelos= await searchFly(originCity, destinationCity, ida_formateada, vuelta_formateada, personas, 'EUR')
}


export const getImages = async(req, res)=>{

    console.log("****************** Acceso ruta getImages ******************")

    const {id } = req.body;
    const imagenes= await searchImageBooking(id)
    console.log(id)
    res.send(imagenes)

}


export const buscarOfertasAutomaticoAirbnb= async(req, res)=>{
    console.log("****************** Acceso ruta findPlan ******************")
    const { origen, personas, destino, fecha_ida, fecha_vuelta, tipo,  company, imagen, galeria, descripcion, urlVuelos} = req.body;
    // const origen="Madrid", personas="2", destino="Ibiza", fecha_ida="2024-07-17", fecha_vuelta="2024-07-24"
    // console.log(origen, personas, destino, fecha_ida, fecha_vuelta)
    
    const ida_formateada= adaptadorFecha(fecha_ida);
    const vuelta_formateada= adaptadorFecha(fecha_vuelta);
    const originCity= await searchId(origen);
    const destinationCity= await searchId(destino);
    //const cityIdBooking = await searchIdBooking(destino)



    console.log("************ Consultando los vuelos: "+`{${origen}, ${destino}, ${fecha_ida}, ${fecha_vuelta}, ${personas}} ************`)
    var resultadoVuelos= await searchFlyAuto(originCity, destinationCity, fecha_ida, fecha_vuelta, personas, 'EUR')
    console.log(`************ Vuelos obtenidos ************`+ resultadoVuelos)
    var imagenes = "";
    if(resultadoVuelos != 'No hay vuelos disponibles'){
        
    }

    //if(company == 'airbnb'){

        console.log("************ Consultando los Alojamientos Airbnb: "+`{${origen}, ${destino}, ${fecha_ida}, ${fecha_vuelta}, ${personas}} ************`)
        var resultadoAlojamientosAir=await searchAlojamientoAirbnbAuto(destino, ida_formateada,vuelta_formateada, personas, 0, 'EUR' )
        imagenes=resultadoAlojamientosAir.images.join(';');
        
        console.log(`************ Alojamientos obtenidos ************`+ resultadoAlojamientosAir)
        const aloj = await saveAlojamientoV2(resultadoAlojamientosAir.name, 3, resultadoAlojamientosAir.rating*2, resultadoAlojamientosAir.address, parseFloat(resultadoAlojamientosAir.price.rate), resultadoAlojamientosAir.deeplink, ida_formateada, imagenes, company, resultadoAlojamientosAir.id)

    // }else{

    // }
    console.log("Total vuelos "+ resultadoVuelos[0].precio)
    const precioIda=parseFloat(resultadoVuelos[0].precio/parseFloat(personas))/2
    const precioVuelta= parseFloat(resultadoVuelos[1].precio/parseFloat(personas))/2
    const precioNoche= parseFloat(resultadoAlojamientosAir.price.rate)
    console.log(calcularNumeroDeNoches(fecha_ida, fecha_vuelta)+1)
    console.log("Total noches " +precioNoche*(calcularNumeroDeNoches(fecha_ida, fecha_vuelta)+1))
    const toatAlojamiento = precioNoche*(calcularNumeroDeNoches(fecha_ida, fecha_vuelta)+1)
    console.log("Total formula: " +(resultadoVuelos[0].precio+(precioNoche*(calcularNumeroDeNoches(fecha_ida, fecha_vuelta)+1)))/personas)
    console.log("TotalNormal "+ (resultadoVuelos[0].precio + toatAlojamiento) / personas)
    


    const vueloIda = await saveVueloV2(resultadoVuelos[0].aerolinea, resultadoVuelos[0].aeropuertoIda, resultadoVuelos[0].aeropuertoVuelta, precioIda, resultadoVuelos[0].horaSalida.split("T")[1], resultadoVuelos[0].horaLlegada.split("T")[1], fecha_ida, urlVuelos, resultadoVuelos[0].urlImagen)

    const vueloVuelta = await saveVueloV2(resultadoVuelos[1].aerolinea, resultadoVuelos[1].aeropuertoIda, resultadoVuelos[1].aeropuertoVuelta, precioVuelta, resultadoVuelos[1].horaSalida.split("T")[1], resultadoVuelos[1].horaLlegada.split("T")[1], fecha_vuelta, urlVuelos, resultadoVuelos[1].urlImagen)

    const oferta = await saveOfertaV2(origen, destino, fecha_ida, fecha_vuelta, imagen, `${galeria};${imagenes}`, resultadoVuelos[0].precio+(precioNoche*(calcularNumeroDeNoches(fecha_ida, fecha_vuelta)+1)), tipo, descripcion, personas, (resultadoVuelos[0].precio+(precioNoche*(calcularNumeroDeNoches(fecha_ida, fecha_vuelta)+1)))/personas, calcularNumeroDeNoches(fecha_ida, fecha_vuelta), "Solo Alojamiento", vueloIda.id, vueloVuelta.id, aloj.id)

    console.log("Oferta guardada con exito")
    res.send({vuelo: resultadoVuelos, oferta: oferta, alojamiento: aloj})
}






export function calcularNumeroDeNoches(fechaIdaStr, fechaVueltaStr) {
    const fechaIda = new Date(fechaIdaStr);
    const fechaVuelta = new Date(fechaVueltaStr);
    
    // Calculamos la diferencia en milisegundos
    const diferenciaMilisegundos = fechaVuelta - fechaIda;
    
    // Convertimos la diferencia de milisegundos a días
    const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);
    
    // El número de noches es la diferencia de días menos 1
    const numeroDeNoches = diferenciaDias - 1;
  
    return numeroDeNoches;
  }

export const extractDomain = (url) => {
    // Crear un objeto URL
    const parsedUrl = new URL(url);
  
    // Obtener el hostname (por ejemplo, "www.booking.com")
    const hostname = parsedUrl.hostname;
  
    // Dividir el hostname en partes y obtener el dominio principal
    const parts = hostname.split('.');
    // Esto asume que el dominio tiene al menos dos partes, por ejemplo "booking.com"
    const domain = parts.length > 2 ? parts.slice(-2, -1)[0] : parts[0];
  
    return domain;
  };