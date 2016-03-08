const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const Project = new Schema({
  author: {
    type: String,
    require: true,
    ref: 'User'
  },
  progress: Array,
  comments: [{type: String, ref: 'Comment'}],
  time : { type : Date, default: Date.now }
  });

module.exports = mongoose.model( 'Project', Project );
