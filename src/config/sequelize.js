import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Configuración de la conexión a la base de datos utilizando las variables de entorno
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false, // Desactivar el registro de consultas SQL
    pool: {
        max: 10, // Número máximo de conexiones en el pool
        min: 0,
        acquire: 30000, // Tiempo máximo en ms que el pool intentará obtener una conexión antes de lanzar un error
        idle: 10000 // Tiempo máximo en ms que una conexión puede estar inactiva antes de ser liberada
    }
});

export default sequelize;
