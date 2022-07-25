const Career = require('../models/career');

exports.getCareerByCod = async (req, res) => {
    try {
        const response = await Career.findByPk(req.params.cod);
        if (response)
            return res.status(200).json(response.toJSON());
        return res.status(404).json('El código no existe');
    } catch (err) {
        return res.status(500).json(err);
    }
}