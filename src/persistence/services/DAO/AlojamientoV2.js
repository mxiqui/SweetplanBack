import { AlojamientoV2 } from "../../models/v2/AlojamientoV2.js";


export const createTableAlojamiento =()=>{
    AlojamientoV2.sync({ force: true }).then(() => {
        console.log('Tabla OfertaV2 creada correctamente en la base de datos');
    }).catch(error => {
        console.error('Error al crear la tabla Ofertav2 en la base de datos:', error);
    });
}

export const saveAlojamientoV2 = async (nombre, estrellas, puntuacion, direccion, precio, url, fecha, galeria, company, idCompany)=>{
    const alojamiento =  AlojamientoV2.create({
        nombre: nombre,
        estrellas:estrellas,
        puntuacion:puntuacion,
        direccion:direccion,
        precio:precio,
        url:url,
        fecha:fecha,
        galeria:galeria,
        company: company,
        idCompany:idCompany
    });
    return alojamiento;
          
}