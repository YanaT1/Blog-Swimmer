const Router = require('express');
const router = new Router();
const years_resultsController = require('../controllers/years_resultsController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/admin-person78946', authMiddleware, checkRole('admin'), years_resultsController.create);
router.get('/', years_resultsController.getAll);
//router.get('/:id', years_resultsController.getOne);
router.put('/admin-person78946/:id', authMiddleware, checkRole('admin'), years_resultsController.update)
router.delete('/admin-person78946/:id', authMiddleware, checkRole('admin'), years_resultsController.delete);

module.exports = router;