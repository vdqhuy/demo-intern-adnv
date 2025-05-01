module.exports = (sequelize, DataTypes) => {
  return sequelize.define('UserLoginInfo', {
    orig_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
    },
    versioned_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      primaryKey: true
    }
  }, {
    tableName: 'vidmh_user_login_info',
    timestamps: false
  });
};

