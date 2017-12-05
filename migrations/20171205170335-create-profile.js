'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
      },
      talents: {
        type: Sequelize.STRING,
      },
      favorites: {
        type: Sequelize.STRING,
      },
      why: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      marital: {
        type: Sequelize.STRING,
      },
      height: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.STRING,
      },
      kids: {
        type: Sequelize.STRING,
      },
      occupation: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Profiles');
  },
};
