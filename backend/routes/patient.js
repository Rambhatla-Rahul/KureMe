const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const {searchPatient, createPatient} = require('../controllers/patientController');

const router = express.Router();

router.get('/login',verifyToken, async (req, res) => {
  try {
    const decodedPatient = req.user;
    if (!decodedPatient) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const searchedPatient = await searchPatient(decodedPatient.uid);
    if (!searchedPatient) {      
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(searchedPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/register', verifyToken, async (req, res) => {
  try {
    const decodedPatient = req.user;
    if (!decodedPatient) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log(req.body);
    
    const { patientInfo } = req.body;
    if (!patientInfo) {
      return res.status(400).json({ message: 'Patient information is required' });
    }
    const existingPatient = await searchPatient(patientInfo.uid);
    if (existingPatient) {
      return res.status(400).json({ message: 'Patient already exists' });
    }
    const newPatient = await createPatient(patientInfo);
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/details', verifyToken, async (req, res) => {
  try {
    const decodedPatient = req.user;
    if (!decodedPatient) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const uid  = req.user.uid;
    if (!uid) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const patientDetails = await searchPatient(uid);
    if (!patientDetails) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(patientDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/loginwithgoogle', verifyToken, async (req, res) => {
  try {
    const decodedPatient = req.user;
    if (!decodedPatient) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { patientInfo } = req.body;
    if (!patientInfo) {
      return res.status(400).json({ message: 'Patient information is required' });
    }
    const searchedPatient = await searchPatient(patientInfo.uid);
    if (!searchedPatient) {
       const newPatient = await createPatient(patientInfo);
       return res.status(201).json(newPatient);
    }
    return res.status(200).json(searchedPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
);
module.exports = router;