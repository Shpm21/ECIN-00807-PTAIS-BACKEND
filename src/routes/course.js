const { Router } = require('express');
const router = Router();
const CourseController = require('../controllers/course');
const { validateTokenAuthentication } = require('../middlewares/middlewares');

router.get('/courses/:cod', validateTokenAuthentication, CourseController.getCourseByCod);

module.exports = router;