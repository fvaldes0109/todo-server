const { Router } = require('express');
const { check } = require('express-validator');

const { tasksGet, tasksPost, tasksDelete, tasksPut } = require('../services/tasks');
const { validateFields, validStatus, validTitleUpdate, validPriority } = require('./validate-fields');

const router = Router();

router.get('/', tasksGet);

router.post('/', [
    check('title', 'The title is required').not().isEmpty(),
    check('status').custom(validStatus),
    check('priority').custom(validPriority),
    validateFields,
], tasksPost);

router.put('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    check('title').custom(validTitleUpdate),
    check('status').custom(validStatus),
    check('priority').custom(validPriority),
    validateFields,
], tasksPut);

router.delete('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    validateFields,
], tasksDelete);

module.exports = router;