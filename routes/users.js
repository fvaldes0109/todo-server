const { Router } = require('express');
const { check } = require('express-validator');

const { usersPost, usersGet } = require('../services/users');
const { validateFields, isUniqueEmail, validateJWT } = require('../helpers/validate-fields');

const router = Router();

router.get('/', [
    validateJWT,
    validateFields
], usersGet);

router.post('/', [
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(isUniqueEmail),
    check('password', 'You must provide a password').not().isEmpty(),
    validateFields
], usersPost);

module.exports = router;