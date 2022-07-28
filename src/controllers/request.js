const { execute } = require('../querys/algorithm');

exports.getCoursesAvailable = async (req, res) => {
    try {
        const rut = req.params.rut;
        response = await execute(rut);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json(err);
    }
};