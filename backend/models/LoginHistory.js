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
  time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  session: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'login_history',
  timestamps: false, // because we don't need createdAt and updatedAt fields
  indexes: [
    {
      unique: true,
      fields: ['app', 'session'],
    },
  ],
});

module.exports = LoginHistory;
