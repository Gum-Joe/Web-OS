// api
// RETURN text
var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');

/* GET / and return index */
router.get('/', function(req, res) {
        res.format({
            'text/html': function() {
                res.send(fs.readFileSync('views/api/api.html'));
            },
        });
    })
    /* GET /user/quickactions and return json */
router.get('/user/quickactions', function(req, res) {
    res.json(require('../../../config/quickactions'));
})

/* POST api tubs/log */
router.post('/tubs/log', function(req, res) {
    console.log(req.body.data);
});

module.exports = router;