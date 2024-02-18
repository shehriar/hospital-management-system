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
    // console.log(req.body['name']);
    const patientDetailsArray = [req.body['name'], req.body['email'], req.body['dob'], req.body['phone'], req.body['password']];
//   const valuesArray = Object.values(req.body);
    console.log(patientDetailsArray); 
    db.insertToPatient(patientDetailsArray);
    res.status(200).send('Patient details received');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:3000`);
});