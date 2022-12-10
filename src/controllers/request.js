const Prerequisite = require("../models/prerequisite");
const { getSemesterStudent } = require("../querys/algorithm");
const { getAverageApproved } = require("../querys/getInformation");

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

exports.getAverageApproval = async (req, res) => {
  try {
    const rut = req.params.rut;
    const response = await getAverageApproved(rut);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getAllPostRequisitesController = async (req, res) => {
  try {
    const codCourse = req.params.codCourse;
    const response = [];
    const allPrerequisites = await Prerequisite.findAll();
    const allPrerequisitesJSON = JSON.parse(JSON.stringify(allPrerequisites));
    const allPostRequisites = allPrerequisitesJSON.filter((prerequisite) => {
      return prerequisite.cod_course_pre === codCourse;
    });

    let existPostRequisites = true;
    while (existPostRequisites) {
      existPostRequisites = false;
      for (let i = 0; i < allPostRequisites.length; i++) {
        const postRequisite = allPostRequisites[i];
        if (!response.includes(postRequisite.cod_course)) {
          response.push(postRequisite.cod_course);
          existPostRequisites = true;
        }
        const postRequisites = allPrerequisitesJSON.filter((prerequisite) => {
          return prerequisite.cod_course_pre === postRequisite.cod_course;
        });
        for (let j = 0; j < postRequisites.length; j++) {
          const postRequisite = postRequisites[j];
          if (!allPostRequisites.includes(postRequisite)) {
            allPostRequisites.push(postRequisite);
          }
        }
      }
    }
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
};
