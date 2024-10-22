const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('tp1', 'postgres', 'maleyuyu', {
    dialect: 'postgres',
    host: 'localhost',
    ssl: true,
});

module.exports = { sequelize };