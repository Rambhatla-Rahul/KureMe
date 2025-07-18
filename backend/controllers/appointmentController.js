const Appointment = require('../models/appointmentModel');
const getAppointments = async (userId) => {
  try {
    const appointments = await Appointment.find({userId});
    return appointments;
  } catch (err) {
    throw new Error('Server error fetching appointments');
  }
};

const createAppointment = async (formData,userId) => {
  try {
    const { doctor, date, time, reason, status } = formData;
    console.log(formData,userId);
    if (!doctor || !date || !time || !reason) {
      throw new Error('All fields are required!');
    }
    const allAppointments = getAppointments(userId);
    
    const newAppointment = new Appointment({
      doctor,
      date,
      time,
      reason,
      status: status || 'Pending',
      userId,
    });
    console.log(newAppointment);
    
    const savedAppointment = await newAppointment.save();
    console.log(savedAppointment);
    
    return savedAppointment;
  } catch (err) {
    res.status(500).json({ error: 'Server error creating appointment' });
  }
};

module.exports = {createAppointment,getAppointments}
