// src/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  openId: {
    type: String,
    required: true,
  },
  scene: {
    type: Number,
    required: true,
  },
  shareId: {
    type: String,
    required: false,
  },
  from: {
    type: String,
    required: false,
  },
  coins: {
    type: Number,
    required: true,
    default: 0,
  },
  addTime: {
    type: Number,
    required: true,
  },
  chapter: {
    type: Number,
    required: true,
    default: 1,
  },
  level: {
    type: Number,
    required: true,
    default: 1,
  },
});

const User = mongoose.model('users', userSchema);

module.exports = User;
