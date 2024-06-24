import { DataTypes } from 'sequelize';
import sequelize from '../../../config/sequelize.js'


import {VueloV2} from './VueloV2.js';
import {AlojamientoV2} from './AlojamientoV2.js';

export const OfertaV2 = sequelize.define('OfertaV2', {
    origen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destino: {
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
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    personas: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    precioPersona: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    noches: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    regimen: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
});

OfertaV2.belongsTo(VueloV2, { foreignKey: 'vueloIdaId', as: 'vueloIda' });
OfertaV2.belongsTo(VueloV2, { foreignKey: 'vueloVueltaId', as: 'vueloVuelta' });
OfertaV2.belongsTo(AlojamientoV2, { foreignKey: 'AlojamientoId' });

