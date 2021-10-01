const router = require('express').Router();
const apiRoutes = require('./api');
const testRoutes = require('./test')
const path = require('path');

router.use('/api', apiRoutes);

// //the following are testing routes. just let me know if you wanna delete them -lily.
// router.use('/test', testRoutes);

// router.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/test/homepageSOCKETTEST.html'));
// });

router.get('/match',(req, res) => {
    res.render('matchpage')
})

router.get('/login',(req, res) => {
    res.render('login')
})

router.get('/',(req, res) => {
    res.render('homepage')
})


router.get('/match',(req, res) => {
    res.render('matchpage')
})

router.get('/login',(req, res) => {
    res.render('login')
})

module.exports = router;