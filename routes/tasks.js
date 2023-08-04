const { Router } = require('express');
const { check } = require('express-validator');

const { tasksGet, tasksPost, tasksDelete, tasksPut, tasksDeleteAll } = require('../services/tasks');
const { validStatus, validTitleUpdate, validPriority } = require('../helpers/validate-fields');
const { validateJWT, taskBelongsToUser, validateFields } = require('../middlewares/middlewares');

const router = Router();

router.get('/', [
    validateJWT,
    validateFields,
], tasksGet);

router.post('/', [
    validateJWT,
    check('title', 'The title is required').not().isEmpty(),
    check('status').custom(validStatus),
    check('priority').custom(validPriority),
    validateFields,
], tasksPost);

router.put('/:id', [
    validateJWT,
    check('id', 'ID is not valid').isMongoId(),
    taskBelongsToUser,
    check('title').custom(validTitleUpdate),
    check('status').custom(validStatus),
    check('priority').custom(validPriority),
    validateFields,
], tasksPut);

router.delete('/', [
    validateJWT,
    validateFields,
], tasksDeleteAll);

router.delete('/:id', [
    validateJWT,
    check('id', 'ID is not valid').isMongoId(),
    taskBelongsToUser,
    validateFields,
], tasksDelete);

module.exports = router;