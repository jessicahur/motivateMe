const router = require('express').Router();
const Projects = require('../models/Project');
const Comments = require('../models/Comment');

//GET all projects
router.get('/', (req, res, next) => {
  Projects.find()
      .sort( {date: 'desc'} )
      .populate('author progress')
      .lean()
      .exec((err, projects) => {
          if(err) {
            return res.status(500).send(err[0]);
          }
          res.send(projects);
        });
});

router.get('/:id', (req, res, next) => {
  Comments.find({'project': req.params.id})
          .populate('author votes')
          .lean()
          .exec((err, comments) => {
            if(err) {
              return res.status(500).send(err);
            }
            console.log(comments);
            res.send(comments);
          });
});

module.exports = router;


