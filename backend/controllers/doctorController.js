const Doctor = require('../models/doctorModel');


const searchDoctor = async (uid) => {
    try {
        const doctor = await Doctor.findOne({ uid });
        if (!doctor) {
            return null;
        }
        return doctor;
    } catch (error) {
        console.log(error.message);
    }
}