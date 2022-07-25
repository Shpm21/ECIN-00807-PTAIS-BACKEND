const { Router } = require('express');
const router = Router();
const StudyPlainController = require('../controllers/studyplain');
const { validateTokenAuthentication } = require('../middlewares/middlewares');

router.get('/studyplains/:cod', validateTokenAuthentication, StudyPlainController.getStudyPlainByCod);

module.exports = router;