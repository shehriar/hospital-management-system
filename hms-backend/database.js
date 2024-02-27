import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

const query = "DELETE FROM Appointment WHERE appointment_time = '9:30'"
const [result] = await pool.query(query);
// console.log(result);

export class Database{
    async insertToDoctor(values){
        try{
            const query = "INSERT INTO Doctor(doctor_name, doctor_email, phone, doctor_password) VALUES (?, ?, ?, ?)";
            await pool.query(query, values);
        }
        catch(err){
            console.log("Error inserting to Doctor table: ", err);
        }
    }

    async returnAllDoctors(){
        const query = "SELECT doctor_id, doctor_name, doctor_email from Doctor;"
        const [result] = await pool.query(query);
        // console.log(result)
        return result;
    }

    async insertToPatient(values){
        try{
            const query = "INSERT INTO Patient(patient_name, patient_email, dob, phone, patient_password) VALUES (?, ?, ?, ?, ?)";
            const [result] = await pool.query(query, values);
            return true;
        }
        catch(err){
            return false;
        }
    }

    async verifyLogin(values){
        try{
            const query = "SELECT * FROM Patient WHERE patient_email = ? AND patient_password = ?;"
            const [queryResult] = await pool.query(query, values);
            // const result = queryResult[0]['count(*)'];
            return queryResult;
        } 
        catch (err){
            console.log(err);
        }
    }

    async returnPatientID(value){
        try{
            // console.log([value]);
            const query = "SELECT Patient_id FROM Patient WHERE patient_email = ?;"
            const [result] = await pool.query(query, [value]);
            return result[0];
        }
        catch(err){
            console.log(err);
        }
    }

    async returnAllPatients(){
        // const query = "DELETE FROM Patient WHERE patient_email = 'rimsharizvi@gmail.com';"
        const query = "SELECT * from Patient;"
        const [result] = await pool.query(query);
        console.log(result);
    }

    async insertToAppointment(values){
        try{
            const query = "INSERT INTO Appointment(appointment_date, doctor_id, patient_id, billing_cost, appointment_time) VALUES (?, ?, ?, ?, ?)";
            await pool.query(query, values);
        }
        catch(err){
            console.log("Error inserting to Appointment table: ", err);
        }
    }

    async deleteAppointment(values){
        const query = "DELETE FROM Appointment WHERE appointment_date = ? AND appointment_time = ? AND doctor_id = (SELECT doctor_id FROM Doctor WHERE doctor_name = ?);"
        await pool.query(query, values);
    }   

    async returnAllAppointments(value){
        // const query = "DELETE FROM Patient WHERE patient_email = 'rimsharizvi@gmail.com';"
        const query = "SELECT appointment.appointment_date, appointment.appointment_time, Doctor.doctor_name FROM Appointment, Doctor WHERE Appointment.patient_id = ? AND doctor.doctor_id = appointment.doctor_id ORDER BY appointment.appointment_date, appointment.appointment_time, doctor.doctor_name ASC;"
        const [result] = await pool.query(query, value);
        return result;
        // console.log(result);
    }

    async getAppointmentDateTimeFromDoctor(value){
        try{
            const query = "SELECT appointment_date, appointment_time FROM Appointment where doctor_id = ?";
            const [result] = await pool.query(query, value);
            // console.log(result);
            return result;
        }
        catch(err){
            console.log(err);
        }
    }
};

// let db = new Database();
// db.getAppointmentDateTimeFromDoctor(1);
// db.returnAllAppointments();
// db.insertToAppointment(["2024-02-28", 1, 8, 200, "11:30"]);
// db.insertToDoctor(['Oleksander Usyk', 'usyk@gmail.com', '388000622', 'tysonberunning']);
// db.returnAllDoctors();
// db.returnAllPatients();
// db.verifyLogin(['sheryl@gmail.com', 'rimsha']);
// const dob = new Date("2000-02-02").toISOString().slice(0, 10);
// db.insertToPatient(['John Doe', 'johndoe@email.com', '1998-02-14', '123456789', 'password1288']);