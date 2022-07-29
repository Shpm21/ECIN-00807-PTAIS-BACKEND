const { QueryTypes } = require('sequelize');
const { sequelize } = require('../connect');
const Student = require('../models/student');

exports.getCoursesStudent = async (rut)  => {
    try {
        const response = await sequelize.query('SELECT * FROM get_courses_student(:rut)', {
            replacements: {
                rut
            }, 
            type: QueryTypes.SELECT
        });
        return response
    } catch (err) {
       console.log(err); 
    }
};

exports.getPrerequisites = async (cod_plain) => {
    try {
        const response = await sequelize.query('SELECT * FROM get_prerequisites(:cod_plain)', {
            replacements: {
                cod_plain
            },
            type: QueryTypes.SELECT
        });
        return response;
    } catch (err) {
        console.log(err);
    }
};

exports.getLevelStudent = async (rut) => {
    try {
        const response = await sequelize.query('SELECT get_level_student as level FROM get_level_student(:rut)', {
            replacements: {
                rut
            }, type: QueryTypes.SELECT
        });
        return response[0];
    } catch (err) {
        console.log(err);
    }
};

exports.getAverageApproved = async (rut) => {
    try {
        const response = await sequelize.query('SELECT get_average_approval as average_approval FROM get_average_approval(:rut)',
        {
            replacements: {
                rut
            }, type: QueryTypes.SELECT
        });
        return response[0];
    } catch (err) {
        console.log(err);
    }
};

exports.getStudentByRut = async (rut) => {
    try {
        const response = await Student.findByPk(rut);   
        return response.toJSON();
    } catch (err) {
        console.log(err);
    }
};

exports.getMaxSemester = async (rut, cod_plain) => {
    try {
        const response = await sequelize.query('SELECT get_max_semester_study_plain as semester_max FROM get_max_semester_study_plain(:rut, :cod_plain)',
        {
            replacements: {
                rut,
                cod_plain
            }, type: QueryTypes.SELECT
        });
        return response[0];
    } catch (err) {
        console.log(err);
    }
};