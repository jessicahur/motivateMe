const router = require('express').Router();
const Projects = require('../models/Project');
const Comments = require('../models/Comment');


// function find (query, req, res, populateItem) {
//   PhysicalBook.find(query)
//               .populate(populateItem)
//               .lean()
//               .exec( (err, books) => {
//                 if(err) {
//                           return res.status(500).send(err[0]);
//                         }
//                 res.send(books);
//               });
// }

//GET all projects
router.get('/', (req, res, next) => {
  Projects.find()
          .populate('author')
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
          .populate('author')
          .lean()
          .exec((err, comments) => {
            if(err) {
              return res.status(500).send(err);
            }
            res.send(comments);
          });
});

module.exports = router;