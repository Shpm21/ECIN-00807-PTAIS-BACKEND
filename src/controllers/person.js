
const Person = require('../models/person');

exports.getPersonByRut = async (req, res) => {
    try {
        const rut = req.params.rut;
        const response = await Person.findByPk(rut);
        if (response)
            return res.status(200).json(response.toJSON());
        return res.status(404).json('El rut no es de un estudiante');
            
    } catch (err) {
        return res.status(500).json(err);
    }
}
