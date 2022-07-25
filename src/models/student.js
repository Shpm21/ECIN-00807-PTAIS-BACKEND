const { sequelize } = require('../connect');
const { Sequelize } = require('sequelize');

const Student = sequelize.define('student', {
        rut_person: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            primaryKey: true
        },
        cod_plain : { 
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            primaryKey: true
        },
        year:{ 
            type: Sequelize.DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
      }
);

module.exports = Student;
