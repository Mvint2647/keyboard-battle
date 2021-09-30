const router = require('express').Router();
const matchRoutes = require('./matchRoutes');
const playerRoutes = require('./playerRoutes');
const textRoutes = require('./textRoutes');

router.use('/match', matchRoutes);
router.use('/player', playerRoutes);
router.use('/text', textRoutes);

module.exports = router;