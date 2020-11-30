'use strict';

module.exports = (sequelize, DataTypes) => {
  const T_TOKEN_FIREBASE = sequelize.define('T_TOKEN_FIREBASE', {
    Id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
    },
    RegisterTokenId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AccountId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    DeviceId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
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

  return T_TOKEN_FIREBASE;
};