const Student = require('../models/student');

exports.getStudents = async (req, res) => {
    try {
        const response = await Student.findAll();
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json(err);
    }
}

exports.getStudentByRut = async (req, res) => {
    try {

        const response = await Student.findByPk(req.params.rut);
        if (response)
            return res.send(response.toJSON());
        return res.status(404).json('El rut no existe');
    } catch (err) {
        return res.status(500).json(err);
    }
}