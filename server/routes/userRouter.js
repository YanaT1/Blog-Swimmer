const Router = require('express').Router;
const router = new Router();
const userController = require('../controllers/userController');
const {body} = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/registration', (req, res) => {
    res.status(403).json({ message: "Registration is currently disabled for public access." });
});
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/forgot-password', userController.forgotPassword); 
router.post('/reset-password/:token', userController.resetPassword);

router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/auth', authMiddleware, userController.check);
router.get('/', userController.getUsers);

router.delete('/:id/delete', userController.delete);

module.exports = router;