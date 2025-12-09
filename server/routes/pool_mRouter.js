const Router = require('express');
const router = new Router();
const pool_mController = require('../controllers/pool_mController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', authMiddleware, checkRole('admin'), pool_mController.create);
router.get('/', pool_mController.getAll);
router.get('/:id', pool_mController.getOne);
router.delete('/:id', authMiddleware, checkRole('admin'), pool_mController.delete);

module.exports = router;