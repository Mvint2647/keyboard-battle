const router = require('express').Router();
const matchRoutes = require('./matchRoutes');
const playerRoutes = require('./playerRoutes');
const textRoutes = require('./textRoutes');

router.use('/', matchRoutes);
router.use('/', playerRoutes);
router.use('/', textRoutes);

module.exports = router;