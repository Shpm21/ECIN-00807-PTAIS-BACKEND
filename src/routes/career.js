const { Router } = require('express');
const router = Router();
const CareerController = require('../controllers/career');
const { validateTokenAuthentication } = require('../middlewares/middlewares');

router.get('/careers/:cod', validateTokenAuthentication, CareerController.getCareerByCod);

module.exports = router;