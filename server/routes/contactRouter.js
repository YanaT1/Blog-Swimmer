const Router = require('express');
const router = new Router();
const contactController = require('../controllers/contactController');

router.post('/', contactController.handleContactForm);

module.exports = router;
