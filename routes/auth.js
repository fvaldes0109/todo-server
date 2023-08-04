const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../services/auth');
const { validateFields } = require('../middlewares/middlewares');

const router = Router();

router.get('/login', [
    check('email', 'Email is not valid').isEmail(),
    check('password', 'You must provide a password').not().isEmpty(),
    validateFields
], login);

module.exports = router;
