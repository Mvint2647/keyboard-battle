const router = require('express').Router();
const apiRoutes = require('./api');
const testRoutes = require('./test')
const path = require('path');
const { createQueryID } = require('../utils');
const {Match, Player } = require('../models');

router.use('/api', apiRoutes);

router.get('/',(req, res) => {
    res.render('homepage', {loggedIn: req.session.loggedIn})

})

router.get('/login',(req, res) => {
    let r = req.query.r;
    if (req.session.loggedIn){
        res.redirect((r) ? `../match/${r}`: '../');
    }
    res.render('login')
})

router.get('/logout',(req, res) => {
    req.session.loggedIn = false;
    req.session.playerID = null;
    res.redirect('../');
})

router.get('/profile',(req, res) => {
    res.render('profile', )
})

//match directories
router.get('/match',(req, res) => {
    res.redirect('../');
})

router.get('/match/create', async (req, res) => {
    if(req.session.loggedIn) {
        const newMatch = await Match.create({
            queryID: createQueryID(),
            player1_id: req.session.playerID
        });
        res.redirect(`${newMatch.queryID}`);
    } else {
        res.redirect('../../');
    }
});

router.get('/match/:matchID', async (req, res) => {
    if(req.session.loggedIn) {
        const matchID = req.params.matchID;
        const requestedMatch = await Match.findOne({
            where: {
                queryID: matchID
            }
        })
        if (requestedMatch) {
            const player1 = await Player.findOne({
                where: {
                    id: req.session.playerID
                }
            })
            res.render('matchpage', {Player1Name: player1.name, Player2Name: "???"});
        }
    } else {
        res.redirect(`../../login?r=${req.params.matchID}`);
    }
});

module.exports = router;