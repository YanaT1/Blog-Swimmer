const Router = require('express');
const router = new Router();
const typeOfMedalsController = require('../controllers/typeOfMedalsController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/admin-person78945', authMiddleware, checkRole('admin'), typeOfMedalsController.create);
router.get('/', typeOfMedalsController.getAll);
router.put('/admin-person78945/:id', authMiddleware, checkRole('admin'), typeOfMedalsController.update);
router.delete('/admin-person78945/:id', authMiddleware, checkRole('admin'), typeOfMedalsController.delete);

module.exports = router;