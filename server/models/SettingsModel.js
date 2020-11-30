'use strict';

module.exports = (sequelize, DataTypes) => {
  const t_settings = sequelize.define('t_settings', {
    setting_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    setting_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    setting_value: {
        type: DataTypes.STRING,
        allowNull: true
    }
  }, 
  {
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false
  }
  );

  return t_settings;
};
