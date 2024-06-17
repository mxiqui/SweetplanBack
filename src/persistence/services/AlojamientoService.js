import { Alojamiento } from "../models/Alojamiento.js";


export class AlojamientoService{


    constructor(){
    }

    createTables(){
        Alojamiento.sync({ force: true }) .then(() => {
            console.log('Tabla Alojamiento creada correctamente en la base de datos');
        }).catch(error => {
            console.error('Error al crear la tabla Alojamiento en la base de datos:', error);
        });
    }
    

    findAll(){
        Alojamiento.findAll().then(alojamiento => {
            console.log(alojamiento)
            return alojamiento
        }).catch(error => {
            console.error('Error al obtener las alojamiento:', error);
            return null;
        });
    }
    

    async findById(id) {
        try {
            const alojamiento = await Alojamiento.findByPk(id);
            return alojamiento || null;
        } catch (error) {
            console.error('Error al obtener el alojamiento por ID:', error);
            throw error; // Re-lanzamos el error para que sea manejado por el bloque catch en la llamada.
        }
    }
    



    save (nombre, estrellas, puntuacion, direccion, precio, noches, url, fecha, galeria, company, idCompany){
        const alojamiento =  Alojamiento.create({
            nombre: nombre,
            estrellas:estrellas,
            puntuacion:puntuacion,
            direccion:direccion,
            precio:precio,
            noches:noches,
            precio_total:precio*noches,
            url:url,
            fecha:fecha,
            galeria:galeria,
            company: company,
            idCompany:idCompany
        });
        return alojamiento;
              
    }
}