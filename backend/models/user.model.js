import { Schema, model } from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

UserSchema.plugin(mongoosePaginate);
const User = model('user', UserSchema);

export default User;
