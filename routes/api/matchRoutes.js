const router = require('express').Router();
const Match = require('../../models/Match');
const { createQueryID } = require('../../utils');

router.get('/create', async (req, res) => {
    if(req.session.loggedIn) {
        const newMatch = await Match.create({
            queryID: createQueryID(),
            player1_id: req.session.playerID
        });
        res.json({url: newMatch.queryID});
    } else {
        res.json({err: 'please login'});
    }
});

module.exports = router;
