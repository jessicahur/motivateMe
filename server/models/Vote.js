const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const Vote = new Schema({
  ups: [{type: Schema.Types.ObjectId, ref: 'User'}],
  downs: [{type: Schema.Types.ObjectId, ref: 'User'}],
  // comment: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Comment'
  // }
  });

module.exports = mongoose.model( 'Vote', Vote );
