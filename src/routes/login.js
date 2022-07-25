const { Router } = require('express');
const router = Router();
const LoginController = require('../controllers/login');
const { validateRutLogin } = require('../middlewares/middlewares');

router.post('/login/', validateRutLogin, LoginController.login);

module.exports = router;