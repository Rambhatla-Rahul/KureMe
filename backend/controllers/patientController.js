const Patient = require('../models/patientModel');
const searchPatient = async (uid) => {
    try {
        const patient = await Patient.findOne({uid});
        if (!patient) {
            return null;
        }
        return patient;
    } catch (error) {
        console.log(error.message);
    }
}

const createPatient = async (patient) => {   
    try {
        const patientExists = await Patient.findOne({uid: patient.uid});
        if (patientExists) {
            return patientExists;
        }
        const newPatient = new Patient({
            uid: patient?.uid,
            displayName: patient?.displayName,
            email: patient?.email,
        });
        await newPatient.save();
        return newPatient;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    searchPatient,
    createPatient,
}