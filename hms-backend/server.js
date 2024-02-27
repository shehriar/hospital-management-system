import express from 'express';
import bodyParser from 'body-parser';
import { Database } from './database.js';
import cors from 'cors';

const db = new Database();

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

app.post('/api/patients', (req, res) => {
    const patientDetailsArray = [req.body['name'], req.body['email'], req.body['dob'], req.body['phone'], req.body['password']];
    db.insertToPatient(patientDetailsArray).then(function(result){
      res.status(200).send(result);
    });
});

app.post('/api/patient_id', (req, res) => {
  db.returnPatientID(req.body[0]).then(function(result){
    res.status(200).send(result);
  })
})

app.post('/api/login', (req, res) => {
  const loginDetails = req.body;
  db.verifyLogin(loginDetails).then(function(result){
    const loginVerified = result;
    res.status(200).send(loginVerified)
  });
});

app.get('/api/all-doctors', (req, res) => {
  db.returnAllDoctors().then(function(result){
    // console.log(result);
    res.status(200).send(result);
  });
});

app.post('/api/insert-appointment', (req, res) =>{
  // console.log(req.body);
  db.insertToAppointment(req.body).then(function(result){
    res.status(200).send(result);
  })
})

app.post('/api/delete-appointment', (req, res) =>{
  db.deleteAppointment(req.body).then(function(result){
    res.status(200).send(result);
  })
})

app.post('/api/appointment-date-time-from-doctor', (req, res) => {
  // console.log("req",req.body);
  const doctorID = req.body[0];
  db.getAppointmentDateTimeFromDoctor(doctorID).then(function(result){
    res.status(200).send(result)
  })
})

app.post('/api/get-patient-appointments', (req, res) => {
  const patientId = req.body[0]
  db.returnAllAppointments(patientId).then(function(result){
    res.status(200).send(result);
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:3000`);
});