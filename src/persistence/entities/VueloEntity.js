export class VueloEntity {

    constructor(aerolinea, origen, destino, aeropuertoIda, aeropuertoVuelta, precio, horaSalida, horaLlegada, duracion, urlImagen) {
        this.aerolinea = aerolinea;
        this.origen=origen;
        this.destino=destino;
        this.aeropuertoIda = aeropuertoIda;
        this.aeropuertoVuelta = aeropuertoVuelta;
        this.precio = precio;
        this.horaSalida = horaSalida;
        this.horaLlegada = horaLlegada;
        this.duracion=duracion;
        this.urlImagen = urlImagen;
    }

    toString() {
        return `Aerolínea: ${this.aerolinea}, Aeropuerto de Ida: ${this.aeropuertoIda}, Aeropuerto de Vuelta: ${this.aeropuertoVuelta}, Precio: ${this.precio}, Hora de Salida: ${this.horaSalida}, Hora de Llegada: ${this.horaLlegada}, URL: ${this.urlImagen}`;
    }
}
