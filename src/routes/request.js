const { Router } = require('express');
const router = Router();
const RequestController = require('../controllers/request');
const { validateTokenAuthentication, validateRut } = require('../middlewares/middlewares');

router.get('/request/:rut', validateRut, validateTokenAuthentication, RequestController.getCoursesAvailable);

module.exports = router;