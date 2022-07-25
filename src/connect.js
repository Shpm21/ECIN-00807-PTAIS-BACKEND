const { Sequelize } = require('sequelize');
require("dotenv").config();

const credentials = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}

exports.sequelize = new Sequelize(
    credentials.database, 
    credentials.user, 
    credentials.password,
    {
        host: credentials.host || 'localhost:3000',
        dialect: 'postgres'
    }
);