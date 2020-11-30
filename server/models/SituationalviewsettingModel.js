'use strict';

module.exports = (sequelize, DataTypes) => {
  // t_situational_view_setting
  const t_situational_view_setting = sequelize.define('t_situational_view_setting', {
    Id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    BusServiceTracking: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
    BusStopTracking: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
    UserTracking: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    DeviceTracking: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    RouteTracking: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    AccountId: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false
  });
  
  return t_situational_view_setting;
};