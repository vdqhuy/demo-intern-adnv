// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('example_app', 'root', '123456Huy!', {
  host: 'localhost',
  dialect: 'mysql',
  logging: true // Tắt log nếu không cần
});

module.exports = sequelize;
