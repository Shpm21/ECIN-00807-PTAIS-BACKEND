const { sequelize } = require('../connect');
const { Sequelize } = require('sequelize');

const StudyPlain = sequelize.define('study_plain', {
        cod: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        cod_career: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
        timestamps: false
      }
);

module.exports = StudyPlain;