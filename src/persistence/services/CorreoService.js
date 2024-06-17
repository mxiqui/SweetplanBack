import { Correo } from "../models/Correo.js";

export function createTables(){
    Correo.sync({ force: true }) .then(() => {
        console.log('Tabla Correo creada correctamente en la base de datos');
    }).catch(error => {
        console.error('Error al crear la tabla Correo en la base de datos:', error);
    });
}


export function saveEmailFunction (email, alerta){
    const correo =  Correo.create({
        email: email,
        alerta:alerta
    });
    return correo;
          
}