const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const Project = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  progress: Array,
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
  });

module.exports = mongoose.model( 'Project', Project );
