const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  doctorId:{
    type: String,
    required: true,
  },
  date: {
    type:String,
    required: true,
  },
  time: {
    type: String,
    required: true
  },
  reason: String,
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'pending','onhold', 'cancelled','in-progress'],
    default: 'scheduled',
  },
  uploadedFiles: [{
    fileName: String,
    fileUerl: String,
  }],
  medications: [{
    medicineName: String,
    dosage: String,
    frequency: String,  
    duration: String,
  }],
  summary: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports =  mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
