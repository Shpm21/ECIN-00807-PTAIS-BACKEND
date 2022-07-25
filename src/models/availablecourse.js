const { sequelize } = require('../connect');
const { Sequelize } = require('sequelize');

const AvailableCourse = sequelize.define('available_course', {
        cod_study_plain: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
        },
        cod_course: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
        },
        level: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
        timestamps: false
      }
);

module.exports = AvailableCourse;