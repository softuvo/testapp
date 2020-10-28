const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');
const findOrCreate = require('mongoose-findorcreate');


const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: '',
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    number: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { minimize: false },
);

UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseStringQuery);
UserSchema.plugin(findOrCreate);

const User = mongoose.model('User', UserSchema);
module.exports = User;
