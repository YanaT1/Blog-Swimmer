const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const adminRouter = require('./adminRouter');
const personalBestsRouter = require('./personalBestsRouter');
const typeOfMedalsRouter = require('./typeOfMedalsRouter');
const style_mRouter = require('./style_mRouter');
const pool_mRouter = require('./pool_mRouter');
const years_resultsRouter = require('./years_resultsRouter');
const contactRouter = require('./contactRouter');
const resultsRouter = require('./resultsRouter');

router.use('/user', userRouter);
router.use('/admin-person78943', adminRouter);
router.use('/personal-bests', personalBestsRouter);
router.use('/medals', typeOfMedalsRouter);
router.use('/style-m', style_mRouter);
router.use('/pool-m', pool_mRouter);
router.use('/results', years_resultsRouter);
router.use('/contact', contactRouter);
router.use('/charts', resultsRouter);

module.exports = router;