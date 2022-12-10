const Prerequisite = require("../models/prerequisite");

exports.getPrerequisites = async (req, res) => {
  try {
    const response = await Prerequisite.findAll();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getPrerequisiteByCodPlain = async (req, res) => {
  try {
    const codPlain = req.params.codPlain;
    const response = await Prerequisite.findAll({
      where: {
        cod_plain: codPlain,
      },
    });
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getPrerequisiteByCodCourse = async (req, res) => {
  try {
    const codCourse = req.params.codCourse;
    const response = await Prerequisite.findAll({
      where: {
        cod_course_pre: codCourse,
      },
    });
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
};
