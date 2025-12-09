const Router = require('express');
const router = new Router();
const style_mController = require('../controllers/style_mController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', authMiddleware, checkRole('admin'), style_mController.create);
router.get('/', style_mController.getAll);
router.get('/:id', style_mController.getOne);
router.put('/:id', authMiddleware, checkRole('admin'), style_mController.update);
router.delete('/:id', authMiddleware, checkRole('admin'), style_mController.delete);

module.exports = router;