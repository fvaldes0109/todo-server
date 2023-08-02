const { Router } = require('express');
const { tasksGet } = require('../controllers/tasks');

const router = Router();

router.get('/', tasksGet);

module.exports = router;