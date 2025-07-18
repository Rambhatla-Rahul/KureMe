const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctor: String,
  date: String,
  time: String,
  reason: String,
  status: {
    type: String,
    default: 'Pending',
  },
  userId: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports =  mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
