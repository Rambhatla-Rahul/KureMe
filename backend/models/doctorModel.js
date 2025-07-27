const mongoose = require('mongoose');

const doctorSchema = new Mongoose.Schema({
    uid: {
        type: String,
        //required: true,
        unique: true,
    },
    email: {
        type: String,
        //required: true,
        unique: true,
    },
    displayName: {
        type: String,
        default: '',
    },
    photoURL: {
        type: String,
        default: '',
    },
    specialization: {
        type: String,
        //required: true,
    },
    experience: {
        type: Number,
        //required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: [{
        patientId: {
            type: String,
            //required: true,
        },
        comment: {
            type: String,
            //required: true,
        },
        rating: {
            type: Number,
            //required: true,
        },
    }],
    availability: [{
        date: {
            type: Date,
            //required: true,
        },
        startTime: {
            type: String,
            //required: true,
        },
        endTime: {
            type: String,
            //required: true,
        },
    }],
    contactInfo: {
        phone: {
            type: String,
            //required: true,
        },
    },
    lisences: [{
        fileName: String,
        fileUrl: String,
        verificationStatus: {
            type: String,
            enum: ['Pending', 'Verified', 'Rejected'],
            default: 'Pending',
        },
    }],
},{timestamps: true});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;