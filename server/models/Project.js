const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const Project = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  progress: Array,
  time : { type : Date, default: Date.now }
  });

module.exports = mongoose.model( 'Project', Project );
