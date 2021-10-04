const router = require('express').Router();
const Match = require('../../models/Match');
const { createQueryID } = require('../../utils');

router.get('/create', async (req, res) => {
    if(req.session.loggedIn) {
        const newMatch = await Match.create({
            queryID: createQueryID(),
            player1_id: req.session.playerID
        });
        res.redirect(`../../match/${newMatch.queryID}`);
    } else {
        res.redirect('../../../');
    }
});

router.get()

module.exports = router;
