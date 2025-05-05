const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // kết nối database

const LoginHistory = sequelize.define('LoginHistory', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  login_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  app: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_login: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'login_history',
  timestamps: false, // vì table này không có cột createdAt / updatedAt
  indexes: [
    {
      unique: true,
      fields: ['login_id', 'app'],
    },
  ],
});

module.exports = LoginHistory;
