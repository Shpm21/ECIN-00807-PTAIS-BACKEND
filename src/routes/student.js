const { Router } = require("express");
const router = Router();
const StudentController = require("../controllers/student");
const {
  validateTokenAuthentication,
  validateRut,
} = require("../middlewares/middlewares");

router.get(
  "/students/",
  validateTokenAuthentication,
  StudentController.getStudents
);
router.get(
  "/students/:rut",
  validateRut,
  validateTokenAuthentication,
  StudentController.getStudentByRut
);

module.exports = router;
