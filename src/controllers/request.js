const { QueryTypes } = require('sequelize');
const { sequelize } = require('../connect');

exports.getCoursesAvailable = async (req, res) => {
    try {
        
        const rut = req.params.rut;
        const response = await sequelize.query('SELECT * FROM get_available_courses(:rut)', {
                replacements: {
                        rut
                },
                type: QueryTypes.SELECT
        });
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json(err);
    }
};