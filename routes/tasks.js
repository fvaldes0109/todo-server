const { Router } = require('express');

const { tasksGet, tasksPost } = require('../services/tasks');

const router = Router();

router.get('/', tasksGet);
router.post('/', tasksPost);

module.exports = router;