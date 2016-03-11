const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const Project = new Schema({

  name: {
    type: String,
    require: true
  },

  author: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },

  description: {
    type: String,
    require: true
  },
  img: {
    type: String,
    require: true
  },
  progress: [{type: Schema.Types.ObjectId, ref: 'Progress'}],

  time : { type : Date, default: Date.now },

  completion : { type: Date, require: true}
});

module.exports = mongoose.model( 'Project', Project );
