const { Router } = require('express');
const { check } = require('express-validator');
const { checkLogin } = require('../controller/login');
const { validarCampos, noExisteEmail } = require('../custom-middleware/validator-campos');


const router = Router();

router.post('/login', [
    check('email', "No es Email Valido").isEmail(),
    check('password', "Password es obligatorio").notEmpty(),
    check('email').custom(noExisteEmail),
    validarCampos
], checkLogin);


module.exports = router;