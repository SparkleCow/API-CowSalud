import { connection } from "../repository/database"
import { Patient } from "../entities/patient"
 
//Patient CRUD
class PatientService{
    constructor(){}

    //Get all patients who were or are affiliates in CowSalud EPS
    async getAllPatients(){
        const dbConnection = await connection();
        const [result] = await dbConnection.query("SELECT * FROM pacientes");
        return result;
    }

    //Get all patients who are currently affiliates in CowSalud EPS
    async getAllActivePatients(){
        const dbConnection = await connection();
        const [result] = await dbConnection.query("SELECT * FROM pacientes WHERE activo=1");
        return result;
    }

    async getPatientById(cedula:number){
        const dbConnection = await connection();
        const[result]:any = await dbConnection.query("SELECT * FROM pacientes WHERE numero_cedula=? AND activo=1",[cedula]);
        if(result.length>0){
            return result;
        }
        return null;
    }

    async createPatient(patient:Patient){
        const dbConnection = await connection();
        await dbConnection.query("INSERT INTO pacientes (numero_cedula, nombre, apellido, edad, telefono, activo) VALUES (?, ?, ?, ?, ?,1)",
            [patient.cedula, patient.nombre, patient.apellido, patient.edad, patient.telefono]
        );
    }

    async deletePatientById(cedula:number){
        const dbConnection = await connection();
        //Logic delete. Change status "active" to zero for an inactive patient.
        await dbConnection.query("UPDATE pacientes SET activo=0 WHERE numero_cedula=?",[cedula]);
    }
}
export default PatientService;
