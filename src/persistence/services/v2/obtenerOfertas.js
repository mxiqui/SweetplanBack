import { obtenerOfertaPorIdV2, obtenerOfertaPorTipo, obtenerTodasLasOfertas } from "../DAO/OfertaDAO.js";


export const obtenerOfertas = async (req, res) =>{

    const {tipo} = req.body;
    console.log("Obteniendo ofertas V2 tipo "+tipo)
    var ofertas;

    switch (tipo) {
        case "all":
            ofertas= await obtenerTodasLasOfertas()
            break;
        
        case "escapadas":
            ofertas= await obtenerOfertaPorTipo("escapadas")
            break;

        case "romanticas":
            ofertas= await obtenerOfertaPorTipo("romanticas")
            break;

        case "ofertaEspecial":
            ofertas=  await obtenerOfertaPorTipo("ofertaEspecial")
            break;

        case "chollos":
            ofertas= await obtenerOfertaPorTipo("chollos")
            break;
    
        default:
            break;
    }
    
    console.log("Ofertas obtenidas"+tipo+ofertas.length)
    res.send(ofertas)

}


export const obtenerOfertaPorId = async (req, res)=>{
    const {id} = req.body;
    console.log("Obteniendo ofertas con id: "+id)
    const oferta = await obtenerOfertaPorIdV2(id)
    res.send(oferta)
}