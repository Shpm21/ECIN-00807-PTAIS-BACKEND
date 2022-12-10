const { sequelize } = require('../connect');
const { Sequelize } = require('sequelize');

const Course = sequelize.define('course', {
        cod: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            primaryKey: true
        },
        name : {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false
        },
        semester: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        credit : {
            type: Sequelize.DataTypes.INTEGER,
            allowNullL: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
      }
);

module.exports = Course;
