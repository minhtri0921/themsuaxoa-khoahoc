const express = require('express')
const router = express.Router();

const coursesController = require('../controllers/CoursesController')

router.get('/', coursesController.index);

router.post('/add', coursesController.add);

router.put('/update', coursesController.update);

router.delete('/delete', coursesController.delete);

module.exports = router;
