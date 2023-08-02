const { Router } = require('express');
const { check } = require('express-validator');

const { tasksGet, tasksPost } = require('../services/tasks');
const { validateFields } = require('./validate-fields');

const router = Router();

router.get('/', tasksGet);

router.post('/', [
    check('title', 'The title is required').not().isEmpty(),
    check('status').custom( (status) => {
        const validStatus = ['PENDING', 'COMPLETED'];
        if( status !== undefined && !validStatus.includes(status) ){
            throw new Error(`The status must be one of the following: ${validStatus}`);
        }
        return true;
    }),
    validateFields,
], tasksPost);

module.exports = router;