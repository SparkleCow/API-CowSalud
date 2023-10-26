import { connection } from "../repository/database"
import { Patient } from "../entities/patient"
 
class PatientService{
    constructor(){}

    //Metodos CRUD de los doctores
    async getAllPatients(){
        const dbConnection = await connection();
        const [result] = await dbConnection.query("SELECT * FROM pacientes");
        return result;
    }

    async getPatientById(cedula:number){
        const dbConnection = await connection();
        const[result] = await dbConnection.query("SELECT * FROM pacientes WHERE numero_cedula=?",[cedula]);
        return result;
    }

    async createPatient(patient:Patient){
        const dbConnection = await connection();
        await dbConnection.query(
            "INSERT INTO pacientes (numero_cedula, nombre, apellido, edad, telefono) VALUES (?, ?, ?, ?, ?)",
            [patient.cedula, patient.nombre, patient.apellido, patient.edad, patient.telefono]
        );
    }

    async deletePatientById(cedula:number){
        const dbConnection = await connection();
        await dbConnection.query("DELETE FROM pacientes WHERE numero_cedula=?",[cedula]);
    }
}

export default PatientService;
