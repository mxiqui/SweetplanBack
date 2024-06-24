import { VueloV2 } from "../../models/v2/VueloV2.js";


export const createTableVuelo =()=>{
    VueloV2.sync({ force: true }).then(() => {
        console.log('Tabla OfertaV2 creada correctamente en la base de datos');
    }).catch(error => {
        console.error('Error al crear la tabla Ofertav2 en la base de datos:', error);
    });
}


export const saveVueloV2 = async(aerolinea, aeropuertoIda, aeropuertoVuelta, precio, horaSalida, horaLlegada, fecha, url, imgAerolinea)=>{
    const vueloIda = await VueloV2.create({
        aerolinea: aerolinea,
        aeropuertoIda: aeropuertoIda,
        aeropuertoVuelta: aeropuertoVuelta,
        precio: precio,
        horaSalida: horaSalida,
        horaLlegada: horaLlegada,
        fecha:fecha,
        url:url,
        imagenAerolinea:imgAerolinea
    });
    return vueloIda;
}