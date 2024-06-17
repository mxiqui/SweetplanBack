import { AlojamientoService } from "../persistence/services/AlojamientoService.js";
import { OfertaService } from "../persistence/services/OfertaService.js";

var ofertaServicio = new OfertaService();

export const getAllOffers = (req, res) => {
    var tipo = req.params.type;
    console.log("****************** Acceso ruta getAllOffers ****************** " + tipo);

    ofertaServicio.findAll()
        .then(offers => {
            // Filtrar las ofertas según el tipo especificado
            var ofertasFiltradas = offers.filter(oferta => oferta.tipo === tipo);
            res.send(ofertasFiltradas); // Devolver el array filtrado
        })
        .catch(() => {
            console.error('Error al obtener las ofertas');
            res.status(500).send('Error al obtener las ofertas');
        });
};




export const getOfferById = (req, res) => {
    console.log("****************** Acceso ruta getOfferById ******************")

    console.log(`****************** Recuperando oferta oferta con id ${req.params.id} *****************`)
    ofertaServicio.findById(req.params.id)
        .then((oferta)=>{
            if(oferta==null){
                res.send("No existe ninguna oferta con el id especificado.")
            }
            console.log("****************** Devuelta oferta ******************")
            res.send(oferta);
        })
}




export const getAlojamientoById = (req, res) => {
    console.log("****************** Acceso ruta getAlojamientoById ******************")
    console.log(`****************** Recuperando alojamiento con id ${req.params.id} *****************`)
    var servicio = new AlojamientoService();

    servicio.findById(req.params.id)
        .then((oferta)=>{
            if(oferta==null){
                res.send(null)
            }
            console.log(oferta)
            console.log("****************** Devuelto Alojamiento ******************")
            res.send(oferta);
        })
}
