const express = require('express');
const router = express.Router();
const resultsController = require('../controllers/resultsController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');


router.post('/admin-person78946', authMiddleware, checkRole('admin'), resultsController.addResult);
router.get('/bests', resultsController.getBestResults);
router.get('/', resultsController.getAllResults);
router.put('/admin-person78946/:id', authMiddleware, checkRole('admin'), resultsController.updateResult);
router.delete('/admin-person78946/:id', authMiddleware, checkRole('admin'), resultsController.deleteResult);

module.exports = router;
