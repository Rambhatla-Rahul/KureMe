const Appointment = require('../models/appointmentModel');
const getAppointments = async (patientId) => {
  try {
    const appointments = await Appointment.find({patientId});    
    return appointments;
  } catch (err) {
    throw new Error('Server error fetching appointments');
  }
};

const createAppointment = async (formData) => {
  try {
    const { doctorId, patientId ,date, time, reason, status,uploadedFiles,medications,summary } = formData
    if (!doctorId || !patientId || !date || !time) {
      throw new Error('All fields are required!');
    }    
    const newAppointment = new Appointment({
      doctorId,
      patientId,
      date,
      time,
      reason,
      status: status || 'Pending',
      uploadedFiles: uploadedFiles || [],
      medications: medications || [],
      summary: summary || '',
    });
    const savedAppointment = await newAppointment.save();
    return savedAppointment;
  } catch (err) {
    res.status(500).json({ error: 'Server error creating appointment' });
  }
};

module.exports = {createAppointment,getAppointments}
