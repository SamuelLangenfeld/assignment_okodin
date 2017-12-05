'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profile = sequelize.define(
    'Profile',
    {
      description: DataTypes.STRING,
      talents: DataTypes.STRING,
      favorites: DataTypes.STRING,
      why: DataTypes.STRING,
      gender: DataTypes.STRING,
      marital: DataTypes.STRING,
      height: DataTypes.STRING,
      body: DataTypes.STRING,
      kids: DataTypes.STRING,
      occupation: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        },
      },
    },
  );

  Profile.associate = function(models) {
    Profile.hasOne(models.User, {foreignKey: 'profileId'});
  };
  return Profile;
};
