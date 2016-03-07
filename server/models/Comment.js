const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const Comment = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  project: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'Project'
  },
  content: String,
  tags: {
    type: String,
    enum: ['advice', 'asset', 'comment']
  },
  votes: [{type: Number, ref: 'User'}],
  time : { type : Date, default: Date.now }
});

module.exports = mongoose.model( 'Comment', Comment );
