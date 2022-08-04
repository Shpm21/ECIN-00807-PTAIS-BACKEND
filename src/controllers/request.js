const { QueryTypes } = require('sequelize');
const { sequelize } = require('../connect');
const { getSemesterStudent } = require('../querys/algorithm');

exports.getCoursesAvailable = async (req, res) => {
    try {
        const rut = req.params.rut;
        response = await getSemesterStudent(rut);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.getCoursesStudent = async (req, res) => {
    try {
        const rut = req.body.rut;
        const codStudyPlain = req.body.codStudyPlain;
        const response = await sequelize.query('SELECT * FROM get_courses_student(:rut, :codStudyPlain)', {
            replacements: {
                rut,
                codStudyPlain
            }, 
            type: QueryTypes.SELECT
        });
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json(err);
    }
}

exports.getPrerequisites = async (req, res) => {
    try {
        const codStudyPlain = req.body.codStudyPlain;
        const response = await sequelize.query('SELECT * FROM get_prerequisites(:codStudyPlain)', {
            replacements: {
                codStudyPlain
            },
            type: QueryTypes.SELECT
        });
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json(err);
    }
}

exports.getLevelStudent = async (req, res) => {
    try {
        const rut = req.body.rut;
        const codStudyPlain = req.body.codStudyPlain;
        const response = await sequelize.query('SELECT get_level_student as level FROM get_level_student(:rut, :codStudyPlain)', {
            replacements: {
                rut,
                codStudyPlain
            }, type: QueryTypes.SELECT
        });
        return res.status(200).json(response[0]);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.getAverageApproved = async (req, res) => {
    try {
        const rut = req.body.rut;
        const response = await sequelize.query('SELECT get_average_approval as average_approval FROM get_average_approval(:rut)',
        {
            replacements: {
                rut
            }, type: QueryTypes.SELECT
        });
        return res.status(200).json(response[0]);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.getMaxSemester = async (req, res) => {
    try {
        const rut = req.body.rut;
        const codStudyPlain = req.body.codStudyPlain;
        const response = await sequelize.query('SELECT get_max_semester_study_plain as semester_max FROM get_max_semester_study_plain(:rut, :codStudyPlain)',
        {
            replacements: {
                rut,
               codStudyPlain
            }, type: QueryTypes.SELECT
        });
        return res.status(200).json(response[0]);
    } catch (err) {
        return res.status(500).json(err);
    }
};