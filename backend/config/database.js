// db.js
const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('tiramisu', 'admin', 'admindb12345', {
//   host: 'tiramisu.ckfu67ytk3xo.ap-southeast-1.rds.amazonaws.com',
//   dialect: 'mariadb',
//   logging: true
// });

const sequelize = new Sequelize('tiramisu', 'root', '123456Huy!', {
  host: 'localhost',
  dialect: 'mysql',
  logging: true
});


module.exports = sequelize;
