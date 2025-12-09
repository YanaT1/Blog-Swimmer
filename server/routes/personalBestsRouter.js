const Router = require('express');
const router = new Router();
const personalBestsController = require('../controllers/personalBestsController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/admin-person78944', authMiddleware, checkRole('admin'), personalBestsController.create);
router.get('/', personalBestsController.getAll);
// router.get('/:id', personalBestsController.getOne);
router.put('/admin-person78944/:id', authMiddleware, checkRole('admin'), personalBestsController.update);
router.delete('/admin-person78944/:id', authMiddleware, checkRole('admin'), personalBestsController.delete);

module.exports = router;