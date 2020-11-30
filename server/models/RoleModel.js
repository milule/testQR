'use strict';

module.exports = (sequelize, DataTypes) => {
  const T_ROLE = sequelize.define('T_ROLE', {
    RoleId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    RoleName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    Description: {
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

  return T_ROLE;
};