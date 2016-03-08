'use strict';
const express      = require('express');
const router       = express.Router();
const request      = require('request');
const jwt          = require('jwt-simple');
const qs           = require('querystring');
const User         = require('../models/User');
const moment       = require('moment');

/**
 * Save new user to db and give them a signed jwt token
 */
 function createJWT(user) {
   var payload = {
     sub: user._id,
     iat: moment().unix(),
     exp: moment().add(14, 'days').unix()
   };
   return jwt.encode(payload, process.env.TOKEN_SECRET);
 }

router.post('/signup', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, existingUser) {
    if (existingUser) {
      return res.status(409).send({ message: 'Email is already taken' });
    }

    var user = new User({
      displayName: req.body.displayName,
      email: req.body.email,
      password: req.body.password
    });
    console.log(user);
    user.save(function(err, result) {
      if (err) {
        res.status(500).send({ message: err.message });
      }
      console.log('RESULT',result);
      res.send({ token: createJWT(result) });
    });
  });
});

/**
 * Regular login for a user register with methods above
 * Using the +password param to tell mongo to include in query
 */

router.post('/login', function(req, res) {
  User.findOne({ email: req.body.email }, '+password', function(err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Invalid email and/or password' });
    }
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Invalid email and/or password' });
      }
      res.send({ token: createJWT(user) });
    });
  });
});

router.post('/twitter', function(req, res) {

  var requestTokenUrl = process.env.REQ_TOKEN_URL;
  var accessTokenUrl = process.env.ACC_TOKEN_URL;
  var profileUrl = process.env.PROF_URL;

  if (!req.body.oauth_token || !req.body.oauth_verifier) {
    var requestTokenOauth = {
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      callback: req.body.redirectUri
    };

    request.post({ url: requestTokenUrl, oauth: requestTokenOauth }, function(err, response, body) {
      var oauthToken = qs.parse(body);
      res.send(oauthToken);
    });
  } else {
    var accessTokenOauth = {
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      token: req.body.oauth_token,
      verifier: req.body.oauth_verifier
    };
    request.post({ url: accessTokenUrl, oauth: accessTokenOauth }, function(err, response, accessToken) {
      accessToken = qs.parse(accessToken);
      var profileOauth = {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        oauth_token: accessToken.oauth_token
      };
      request.get({
        url: profileUrl + accessToken.screen_name,
        oauth: profileOauth,
        json: true
      }, function(err, response, profile) {
        if (req.header('Authorization')) {
          User.findOne({ twitter: profile.id }, function(err, existingUser) {
            if (existingUser) {
              return res.status(409).send({ message: 'There is already a Twitter account that belongs to you' });
            }
            var token = req.header('Authorization').split(' ')[1];
            var payload = jwt.decode(token, process.env.TOKEN_SECRET);
            User.findById(payload.sub, function(err, user) {
              if (!user) {
                return res.status(400).send({ message: 'User not found' });
              }
              user.twitter = profile.id;
              user.displayName = user.displayName || profile.name;
              user.picture = user.picture || profile.profile_image_url.replace('_normal', '');
              user.save(function(err) {
                res.send({ token: createJWT(user) });
              });
            });
          });
        } else {
          User.findOne({ twitter: profile.id }, function(err, existingUser) {
            if (existingUser) {
              return res.send({ token: createJWT(existingUser) });
            }
            var user = new User();
            user.twitter = profile.id;
            user.displayName = profile.name;
            user.picture = profile.profile_image_url.replace('_normal', '');
            user.save(function() {
              res.send({ token: createJWT(user) });
            });
          });
        }
      });
    });
  }
});

// router.post('/twitter', (req, res) => {
//
//     let reqTokenUrl = process.env.REQ_TOKEN_URL;
//     let accTokenUrl = process.env.ACC_TOKEN_URL;
//     let profileUrl = process.env.PROF_URL;
//     let CON_KEY = process.env.CONSUMER_KEY;
//     let CON_SEC = process.env.CONSUMER_SECRET;
//     if (!req.body.oauth_token || req.body.oauth_verifier) {
//       console.log('Verifier', req.body.oauth_verifier);
//       console.log('token', req.body.oauth_token);
//         let oauthReqToken = {
//             consumer_key: CON_KEY,
//             consumer_secret: CON_SEC,
//             callback: req.body.redirectUri
//         };
//         request.post({
//                 url: reqTokenUrl,
//                 oauth: oauthReqToken
//             },
//             (err, response, body) => {
//                 let oauthToken = qs.parse(body);
//                 console.log('YYYYYYY', oauthToken);
//                 res.send(oauthToken);
//             });
//     } else {
//         let accToken = {
//             consumer_key: CON_KEY,
//             consumer_secret: CON_SEC,
//             token: req.body.oauth_token,
//             verifier: req.body.oauth_verifier
//         };
//         request.post({
//             url: accTokenUrl,
//             oauth: accToken
//         }, (err, res, accessToken) => {
//             accessToken = qs.parse(accessToken);
//             let profileOauth = {
//                 consumer_key: CON_KEY,
//                 consumer_secret: CON_SEC,
//                 oauth_token: accessToken.oauth_token
//             };
//             request.get({
//                 url: `${profileUrl}${accToken.screen_name}`,
//                 oauth: profileOauth,
//                 json: true
//             }, (err, res, profile) => {
//                 if (req.header('Authorization')) {
//                     User.findOne({
//                         twitter: profile.id
//                     }, (err, userExists) => {
//                         let token = req.header('Authorization').split(' ')[1];
//                         let data = jwt.decode(token, CON_SEC);
//
//                         User.findById(data.userId, (err, user) => {
//                             if (!user) {
//                                 return res.status(400).send({
//                                     message: 'sorry, not found'
//                                 })
//                             }
//                             user.twitter = profile.id;
//                             user.displayName = user.displayName || profile.name;
//                             user.save(err => {
//                                 res.send({
//                                     token: signJwt(user)
//                                 });
//                             });
//                         });
//                     });
//                 } else {
//                     User.findOne({
//                         twitter: profile.id
//                     }, (err, userExists) => {
//                         if (userExists) {
//                             return res.send({
//                                 token: signJwt(userExists)
//                             })
//                         }
//                         let user = new User();
//                         user.twitter = profile.id;
//                         user.displayName = profile.name;
//                         user.save(() => {
//                             res.send({
//                                 token: signJwt(user)
//                             })
//                         })
//                     })
//                 }
//             });
//         });
//     }
// });

module.exports = router;
