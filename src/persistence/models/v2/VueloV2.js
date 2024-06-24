import { DataTypes } from 'sequelize';
import sequelize from '../../../config/sequelize.js'


export const VueloV2 = sequelize.define('VueloV2', {
    aerolinea: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aeropuertoIda: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aeropuertoVuelta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    horaSalida: {
        type: DataTypes.TIME,
        allowNull: false
    },
    horaLlegada: {
        type: DataTypes.TIME,
        allowNull: false
    },
    fecha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imagenAerolinea: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    // DIRECTO: {
    //     type: DataTypes.BOOLEAN,
    //     allowNull: false
    // }
  });
  
  