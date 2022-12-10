const { sequelize } = require('../connect');
const { Sequelize } = require('sequelize');

const Prerequisite = sequelize.define('prerequisite', {
        cod_plain: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
        },
        cod_course: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
        },
        cod_course_pre: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
        },
    },
    {
        freezeTableName: true,
        timestamps: false
      }
);

module.exports = Prerequisite;