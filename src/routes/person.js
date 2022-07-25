const { Router } = require('express');
const router = Router();
const PersonController = require('../controllers/person');
const { validateTokenAuthentication, validateRut } = require('../middlewares/middlewares');

router.get('/persons/:rut', validateRut, validateTokenAuthentication, PersonController.getPersonByRut);

module.exports = router;