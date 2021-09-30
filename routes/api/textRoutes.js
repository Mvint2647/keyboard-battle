const router = require('express').Router();
const Text = require('../../models/Text');

router.get('/', async (req, res) => {
    Text.findAll({}).then(response=> res.json(response))
})

module.exports = router;