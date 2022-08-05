const { getSemesterStudent } = require('../querys/algorithm');
const { getAverageApproved } = require('../querys/getInformation');

exports.getCoursesAvailable = async (req, res) => {
    try {
        const rut = req.body.rutStudent;
        const isAverageApproval = req.body.isAverageApproval;
        const response = await getSemesterStudent(rut, isAverageApproval);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.getAverageApproval = async (req, res)=> {
    try {
        const rut = req.params.rut;
        const response = await getAverageApproved(rut);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json(err);
    }
};