const express   = require('express');
const router    = express.Router();

router.get('/', (req, res) => {

    res.render('index', {
        title : 'Lorem Ipsum'
    });
});

module.exports = router;
