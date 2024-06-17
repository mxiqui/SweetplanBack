import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js'


export const Correo = sequelize.define('Correo', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alerta: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  
  