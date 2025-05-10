const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load .env file

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: process.env.DB_LOGGING === 'true',
    port: process.env.DB_PORT,
    dialectOptions: {
      ssl: {
        require: process.env.DB_SSL === 'true', // Use SSL if DB_SSL is set to true
        rejectUnauthorized: false,
      }
    }
  }
);

module.exports = sequelize;


// CREATE TABLE `login_history` (
//   `id` BIGINT NOT NULL AUTO_INCREMENT,
//   `login_id` VARCHAR(255) NOT NULL,
//   `app` VARCHAR(255) NOT NULL,
//   `time` DATETIME NOT NULL,
//   PRIMARY KEY (`id`),
//   UNIQUE KEY `login_history_app_time_login_id_unique` (`app`, `time`, `login_id`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


module.exports = sequelize;
