import { saveEmailFunction } from "../persistence/services/CorreoService.js";

export const saveEmail = async (req, res) => {
    console.log("****************** Acceso ruta Save email ****************** "+req.body.email)

    try {
        const email = req.body.email;
        const alerta = "TODO";
        const x = saveEmailFunction(email, alerta);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    } 
}


export const saveAlert = async (req, res) => {
    try {
        const email = req.body.email;
        const alerta = req.body.alerta;
        const x = saveEmailFunction();
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    } 
}
