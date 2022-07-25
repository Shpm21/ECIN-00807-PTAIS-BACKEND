const { sequelize } = require('../connect');
const { Sequelize } = require('sequelize');

const Person = sequelize.define('person', {
        rut: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        name_2: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        last_name: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        last_name_2: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        name_3: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
        },
        last_name_3: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
        }
    },
    {
        freezeTableName: true,
        timestamps: false
      }
);

module.exports = Person;
