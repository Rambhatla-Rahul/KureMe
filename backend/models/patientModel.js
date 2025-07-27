const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const patientSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    default: '',
  },
  photoURL: {
    type: String,
    default: '',
  },
  phoneNumber: {
    type: String,
    default: '',
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
  bio: {
    type: String,
    default: '',
  },
  uploadedFiles: [{
    fileName: String,
    fileUrl: String,
  }],

}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;