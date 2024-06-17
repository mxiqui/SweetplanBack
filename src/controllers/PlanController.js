import { searchAlojamientoBooking, searchAlojamientoAirbnb, searchImageBooking } from "../persistence/api/search-alojamiento.js";
import { searchFly } from "../persistence/api/search-fly.js";
import { searchId, searchIdBooking } from "../persistence/api/search-id.js";
import { adaptadorFecha } from "../utils/adatptadorFecha.js";


export const findPlan= async(req, res)=>{
    console.log("****************** Acceso ruta findPlan ******************")
    const { origen, personas, destino, fecha_ida, fecha_vuelta } = req.body;
    //const origen="Madrid", personas="4", destino="Roma", fecha_ida="2024-05-17", fecha_vuelta="2024-05-24"
    // console.log(origen, personas, destino, fecha_ida, fecha_vuelta)
    
    const ida_formateada= adaptadorFecha(fecha_ida);
    const vuelta_formateada= adaptadorFecha(fecha_vuelta);
    const originCity= await searchId(origen);
    const destinationCity= await searchId(destino);
    const cityIdBooking = await searchIdBooking(destino)
    console.log(cityIdBooking)



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