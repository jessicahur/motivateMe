const mongoose = require('mongoose');
const restify = require('express-restify-mongoose');

const express       = require('express');
const methodOverride = require('method-override');
const path          = require('path');
const bodyParser    = require('body-parser');
const logger        = require('morgan');

const moment = require( 'moment' );
const jwt = require( 'jwt-simple');

const app           = express();
const router        = require('./router');
const public        = path.join( __dirname + '/public');
//const auth = require( './auth.js' ); //un-comment once we have auth router in place

app.use(bodyParser.json());
app.use( bodyParser.urlencoded({ extended: false }) );

app.use(methodOverride());

app.use(logger('dev'));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
app.use('/', router);

app.use(express.static(public, {redirect : false}));
module.exports = app;

/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
function ensureAuthenticated(req, res, next) {

  if ( req.method === 'OPTIONS' ) return next(); //Pass this to router. Our router doesn't have any method hat deals with OPTIONS request

  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('Authorization').split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, process.env.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}

//mongoose.connect('mongodb://localhost/database')

// restify.serve(router, mongoose.model('Customer', new mongoose.Schema({
//   name: { type: String, required: true },
//   comment: { type: String }
// })))

// app.use(router)

// app.listen(3000, function () {
//   console.log('Express server listening on port 3000')
// })
