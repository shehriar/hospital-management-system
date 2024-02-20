import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

// const query = "ALTER TABLE Appointment ADD billing_cost INT;"
// const [result] = await pool.query(query);
// // console.log(result);

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
        const query = "SELECT * from Doctor;"
        const [result] = await pool.query(query);
        console.log(result);
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
            const query = "INSERT INTO Appointment(appointent_date, doctor_id, patient_id, billing_cost) VALUES (?, ?, ?, ?)";
            await pool.query(query, values);
        }
        catch(err){
            console.log("Error inserting to Appointment table: ", err);
        }
    }
};

// let db = new Database();
// // db.returnAllDoctors();
// db.returnAllPatients();
// db.verifyLogin(['sheryl@gmail.com', 'rimsha']);
// const dob = new Date("2000-02-02").toISOString().slice(0, 10);
// db.insertToPatient(['John Doe', 'johndoe@email.com', '1998-02-14', '123456789', 'password1288']);