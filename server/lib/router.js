const express      = require('express');
const router       = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const path         = require('path');
const mongoose     = require('mongoose');

//so that we can use normal promises, not mongoose style
mongoose.Promise = Promise;

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public', 'index.html'));
});
module.exports = router;
