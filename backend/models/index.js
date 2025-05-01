const Sequelize = require('sequelize');
const config = require('../config/config.js').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.UserLoginInfo = require('./userLoginInfo')(sequelize, Sequelize);

// Tạo quan hệ thủ công qua orig_id
db.User.hasMany(db.UserLoginInfo, { foreignKey: 'orig_id', sourceKey: 'orig_id' });
db.UserLoginInfo.belongsTo(db.User, { foreignKey: 'orig_id', targetKey: 'orig_id' });

module.exports = db;

