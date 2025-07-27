const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const { createAppointment, getAppointments } = require('../controllers/appointmentController');

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  try {
    const decodedUser = req.user;
    if (!decodedUser) {
      return res.status(401).json({ message: 'Unauthorized' });
     }
    const newAppointment = await createAppointment(req.body.formData);
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const decodedUser = req.user;    
    if (!decodedUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const appointments = await getAppointments(decodedUser.uid);
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
