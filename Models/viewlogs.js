const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');
const findOrCreate = require('mongoose-findorcreate');


const ViewSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      trim: true,
    },
    totalViwerCount: {
      type: Number,
      trim: true
    },
    date: {
      type: Date
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Product',
    },
  },
  { minimize: false },
);

ViewSchema.plugin(timestamps);
ViewSchema.plugin(mongooseStringQuery);
ViewSchema.plugin(findOrCreate);

const View = mongoose.model('View', ViewSchema);
module.exports = View;
