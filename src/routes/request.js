const { Router } = require('express');
const router = Router();
const RequestController = require('../controllers/request');
const { validateTokenAuthentication, validateRut, validateRutBody } = require('../middlewares/middlewares');

router.post('/request/', validateRutBody, validateTokenAuthentication, RequestController.getCoursesAvailable);
router.get('/averageapproval/:rut', validateRut, validateTokenAuthentication, RequestController.getAverageApproval);
module.exports = router;