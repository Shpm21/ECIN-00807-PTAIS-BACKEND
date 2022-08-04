const { Router } = require('express');
const router = Router();
const RequestController = require('../controllers/request');
const { validateTokenAuthentication, validateRut } = require('../middlewares/middlewares');

router.get('/request/:rut', validateRut, validateTokenAuthentication, RequestController.getCoursesAvailable);
router.get('/coursesStudent/', RequestController.getCoursesStudent);
router.get('/prerequisites/', RequestController.getPrerequisites);
router.get('/levelStudent/', RequestController.getLevelStudent);
router.get('/averageApproved/', RequestController.getAverageApproved);
module.exports = router;