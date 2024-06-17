import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js'

export const Alojamiento = sequelize.define('Alojamiento', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estrellas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    puntuacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    noches: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    galeria: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idCompany: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
