// db.js
const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('tiramisu', 'root', '123456Huy!', {
//   host: '10.0.9.150',
//   dialect: 'mariadb',
//   logging: true
// });

const sequelize = new Sequelize('tiramisu', 'root', '123456Huy!', {
  host: 'localhost',
  dialect: 'mysql',
  logging: true
});

// CREATE TABLE `login_history` (
//   `id` BIGINT NOT NULL AUTO_INCREMENT,
//   `login_id` VARCHAR(255) NOT NULL,
//   `app` VARCHAR(255) NOT NULL,
//   `time` DATETIME NOT NULL,
//   PRIMARY KEY (`id`),
//   UNIQUE KEY `login_history_app_time_login_id_unique` (`app`, `time`, `login_id`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


module.exports = sequelize;
