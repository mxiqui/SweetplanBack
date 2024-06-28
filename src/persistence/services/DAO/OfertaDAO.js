import { OfertaV2 } from "../../models/v2/OfertaV2.js";
import { VueloV2 } from "../../models/v2/VueloV2.js";
import { AlojamientoV2 } from "../../models/v2/AlojamientoV2.js";


export const obtenerTodasLasOfertas = async () => {
    try {
        const ofertas = await OfertaV2.findAll({
            include: [
                { model: VueloV2, as: 'vueloIda' },
                { model: VueloV2, as: 'vueloVuelta' },
                AlojamientoV2
            ]
        });
        return ofertas;
    } catch (error) {
        console.error('Error al obtener las ofertas:', error);
        return null;
    }
}


export const obtenerOfertaPorIdV2 = async (id) => {
    try {
        const oferta = await OfertaV2.findByPk(id, {
            include: [
                { model: VueloV2, as: 'vueloIda' },
                { model: VueloV2, as: 'vueloVuelta' },
                AlojamientoV2
            ]
        });
        return oferta;
    } catch (error) {
        console.error('Error al obtener la oferta por ID:', error);
        return null;
    }
}


export const obtenerOfertaPorTipo = async (tipo) =>{
    try {
        const ofertas = await OfertaV2.findAll({
            
            include: [
                { model: VueloV2, as: 'vueloIda' },
                { model: VueloV2, as: 'vueloVuelta' },
                { model: AlojamientoV2 }
            ]
        });
        console.log(ofertas.length + tipo)
        return ofertas;
    } catch (error) {
        console.error('Error al buscar ofertas por origen y tipo:', error);
        throw error;
    }
}




export const createTable =()=>{
    OfertaV2.sync({ force: true }).then(() => {
        console.log('Tabla OfertaV2 creada correctamente en la base de datos');
    }).catch(error => {
        console.error('Error al crear la tabla Ofertav2 en la base de datos:', error);
    });
}


export const saveOfertaV2 = (origen, destino, fechaInicio, fechaFin, imagen, galeria, precio, tipo, descripcion, personas, precioPersona, noches, regimen, vueloIda, vueloVuelta, Alojamiento) => {
    const oferta = OfertaV2.create({
            origen: origen,
            destino:destino ,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            imagen: imagen,
            galeria: galeria,
            precio: precio,
            tipo: tipo,
            descripcion: descripcion,
            personas:personas,
            precioPersona: precioPersona,
            noches:noches,
            regimen:regimen,
            vueloIdaId: vueloIda,
            vueloVueltaId: vueloVuelta,
            AlojamientoId: Alojamiento
    });

    return oferta;
}