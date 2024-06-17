import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js'


export const Vuelo = sequelize.define('Vuelo', {
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
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  