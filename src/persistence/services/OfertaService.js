import { Oferta } from "../models/Oferta.js";
import { Vuelo } from "../models/Vuelo.js";
import { Alojamiento } from "../models/Alojamiento.js";

export class OfertaService {
    constructor() {}

    findAll = () => {
        return Oferta.findAll({ 
            include: [
                { model: Vuelo, as: 'vueloIda' },
                { model: Vuelo, as: 'vueloVuelta' },
                Alojamiento
            ]
        })
        .then(ofertas => {
            // Ahora, cada oferta contendrá los datos de vueloIda, vueloVuelta y alojamiento
            return ofertas;
        })
        .catch(error => {
            console.error('Error al obtener las ofertas:', error);
            throw error;
        });
    }




    findById = (id) => {
        return Oferta.findByPk(id, {
            include: [
                { model: Vuelo, as: 'vueloIda' },
                { model: Vuelo, as: 'vueloVuelta' },
                Alojamiento
            ]
        })
        .then(oferta => {
            return oferta; // Retorna la oferta con los datos de vueloIda, vueloVuelta y alojamiento
        })
        .catch(error => {
            console.error('Error al obtener la oferta por ID:', error);
            throw error;
        });
    }




    createTables = () => {
        Oferta.sync({ force: true }).then(() => {
            console.log('Tabla Oferta creada correctamente en la base de datos');
        }).catch(error => {
            console.error('Error al crear la tabla Oferta en la base de datos:', error);
        });
    }


    save = (destino, origen, fechaInicio, fechaFin, imagen, galeria, precio, tipo, vueloIda, vueloVuelta, Alojamiento) => {
        const oferta = Oferta.create({
                  destino:destino ,
                  origen: origen,
                  fechaInicio: fechaInicio,
                  fechaFin: fechaFin,
                  imagen: imagen,
                  galeria: galeria,
                  precio: precio,
                  tipo: tipo,
                  vueloIdaId: vueloIda,
                  vueloVueltaId: vueloVuelta,
                  AlojamientoId: Alojamiento
        });

        return oferta;
    }
}
