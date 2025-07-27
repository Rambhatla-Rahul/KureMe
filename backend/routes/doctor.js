const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();


router.get('/login', verifyToken, async (req, res) => {
    try{
        const decodedDoctor = req.user;
        if (!decodedDoctor) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { doctorInfo } = req.body;
        if (!doctorInfo) {
            return res.status(400).json({ message: 'Doctor information is required' });
        }   
        const searchedDoctor = await searchDoctor(doctorInfo.uid);
        if (!searchedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(searchedDoctor);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/register', verifyToken, async (req, res) => {
    try {
        const decodedDoctor = req.user;
        if (!decodedDoctor) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { doctorInfo } = req.body;
        if (!doctorInfo) {
            return res.status(400).json({ message: 'Doctor information is required' });
        }
        const existingDoctor = await searchDoctor(doctorInfo.uid);
        if (existingDoctor) {
            return res.status(400).json({ message: 'Doctor already exists' });
        }
        const newDoctor = await createDoctor(doctorInfo);
        res.status(201).json(newDoctor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;