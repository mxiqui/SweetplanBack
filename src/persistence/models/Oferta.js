import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js'


import {Vuelo} from './Vuelo.js';
import {Alojamiento} from './Alojamiento.js';

export const Oferta = sequelize.define('Oferta', {
  destino: {
    type: DataTypes.STRING,
    allowNull: false
  },
  origen: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fechaFin: {
    type: DataTypes.DATE,
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true
  },
  galeria: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Oferta.belongsTo(Vuelo, { foreignKey: 'vueloIdaId', as: 'vueloIda' });
Oferta.belongsTo(Vuelo, { foreignKey: 'vueloVueltaId', as: 'vueloVuelta' });
Oferta.belongsTo(Alojamiento, { foreignKey: 'AlojamientoId' });

