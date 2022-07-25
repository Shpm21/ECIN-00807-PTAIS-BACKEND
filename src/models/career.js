const { sequelize } = require('../connect');
const { Sequelize } = require('sequelize');

const Career = sequelize.define('career', {
        cod: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            primaryKey: true
        },
        name : {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
      }
);

module.exports = Career;
