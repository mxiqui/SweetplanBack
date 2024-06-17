import { Vuelo } from "../models/Vuelo.js";


export class VueloService{


    constructor(){
    }

    createTables(){
        Vuelo.sync({ force: true }) .then(() => {
            console.log('Tabla Vuelo creada correctamente en la base de datos');
        }).catch(error => {
            console.error('Error al crear la tabla Vuelo en la base de datos:', error);
        });
    }
    

    findAll(){
        Vuelo.findAll().then(vuelo => {
            console.log(vuelo)
            return vuelo
        }).catch(error => {
            console.error('Error al obtener las Vuelo:', error);
            return null;
        });
    }
    

    findById(id){
        Vuelo.findByPk(id).then(vuelo => {
            if (vuelo) {
                return vuelo
            } else {
                return null
            }
        }).catch(error => {
            console.error('Error al obtener la Vuelo por ID:', error);
        });
    }


    async save(aerolinea, aeropuertoIda, aeropuertoVuelta, precio, horaSalida, horaLlegada, fecha, url){
        const vueloIda = await Vuelo.create({
            aerolinea: aerolinea,
            aeropuertoIda: aeropuertoIda,
            aeropuertoVuelta: aeropuertoVuelta,
            precio: precio,
            horaSalida: horaSalida,
            horaLlegada: horaLlegada,
            fecha:fecha,
            url:url
        });
        return vueloIda;
    }
}