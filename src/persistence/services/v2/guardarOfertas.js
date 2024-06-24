import { saveOfertaV2 } from "../DAO/OfertaDAO.js";
import { saveVueloV2 } from "../DAO/VueloDao.js";
import {saveAlojamientoV2} from '../DAO/AlojamientoV2.js'



export const saveOffer = async (req, res) => {
    const { alojamiento, vuelo, vuelo2, oferta } = req.body;
  
    try {
      const ida = await saveVueloV2(vuelo.aerolinea, vuelo.aeropuertoIda, vuelo.aeropuertoVuelta, parseFloat(vuelo.precio), vuelo.horaLlegada, vuelo.horaSalida, vuelo.fecha, vuelo.url, vuelo.imagenAerolinea);
      const vuelta = await saveVueloV2(vuelo2.aerolinea, vuelo2.aeropuertoIda, vuelo2.aeropuertoVuelta, parseFloat(vuelo2.precio), vuelo2.horaLlegada, vuelo2.horaSalida, vuelo2.fecha, vuelo2.url, vuelo2.imagenAerolinea);
      
      const aloj = await saveAlojamientoV2(alojamiento.nombre, alojamiento.estrellas, alojamiento.puntuacion, alojamiento.direccion, parseFloat(alojamiento.precio), alojamiento.url, alojamiento.fecha, alojamiento.galeria, alojamiento.company, alojamiento.idCompany);
  
      const of = await saveOfertaV2(
        oferta.origen,
        oferta.destino,
        new Date(oferta.fechaInicio),
        new Date(oferta.fechaFin),
        oferta.imagen,
        oferta.galeria,
        parseFloat(vuelo.precio) + parseFloat(vuelo2.precio) + (parseFloat(aloj.precio) * parseFloat(oferta.noches)),
        oferta.tipo,
        oferta.descripcion,
        oferta.personas,
        (parseFloat(vuelo.precio) + parseFloat(vuelo2.precio) + (parseFloat(aloj.precio) * parseFloat(oferta.noches))) / parseFloat(oferta.personas),
        oferta.noches,
        oferta.regimen,
        ida.id,
        vuelta.id,
        aloj.id
      );
  
      console.log("Oferta guardada con éxito");
      res.send("Okey");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error guardando la oferta");
    }
  };
  