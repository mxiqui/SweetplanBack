import { DataTypes } from 'sequelize';
import sequelize from '../../../config/sequelize.js'

export const AlojamientoV2 = sequelize.define('AlojamientoV2', {
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
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fecha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    galeria: {
        type: DataTypes.TEXT,
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
  
