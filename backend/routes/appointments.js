const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const { createAppointment, getAppointments } = require('../controllers/appointmentController');

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  try {
    console.log('This',req.body);
    const newAppointment = await createAppointment(req.body.formData, req.user.uid);
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const appointments = await getAppointments(req.user.uid);    
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
