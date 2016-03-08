const router = require('express').Router();
const Projects = require('../models/Project');


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
router.get('/projects', (req, res, next) => {
  Projects.find()
          .populate('author comments')
          .lean()
          .exec((err, projects) => {
            if(err) {
              return res.status(500).send(err[0]);
            }
            res.send(projects);
          });
});

module.exports = router;
