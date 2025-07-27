const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConnect = require('./utils/dbConnect');
const appointmentRoutes = require('./routes/appointments');
const patientRoutes = require('./routes/patient');
const doctorRoutes = require('./routes/doctor');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000',credentials: true }));
app.use(express.json());

app.use('/api/appointments', appointmentRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/doctor', doctorRoutes);
app.listen(PORT, async () => {
  await dbConnect();
  console.log(`Backend running on http://localhost:${PORT}`);
});
