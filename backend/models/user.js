module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    orig_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    login_id: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    versioned_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'vidmh_user',
    timestamps: false
  });
};

