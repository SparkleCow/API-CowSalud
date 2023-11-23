import { connection } from "../repository/database"
import { Doctor } from "../entities/doctor"

//Doctor CRUD
class DoctorService{

    constructor(){}

    //Get all doctors who were or are active in CowSalud EPS
    async getAllDoctors(){
        const dbConnection = await connection();
        const [result] = await dbConnection.query("SELECT * FROM doctores");
        return result;
    }
    
    //Get all doctors who are active at this moment in CowSalud EPS
    async getAllActiveDoctors(){
        const dbConnection = await connection();
        const [result] = await dbConnection.query("SELECT * FROM doctores WHERE activo=1");
        return result;
    }

    async getDoctorById(id:number){
        const dbConnection = await connection();
        const [result]:any = await dbConnection.query("SELECT * FROM doctores WHERE id=? AND activo=1", [id]);
        if(result.length>0){
            return result;
        }
        return null;
    }

    async createDoctor(doctor:Doctor){
        const dbConnection = await connection();
        await dbConnection.query("INSERT INTO doctores (nombre, apellido, especialidad, consultorio, correo_electronico, activo) values (?,?,?,?,?,1)",
            [doctor.nombre, doctor.apellido, doctor.especialidad, doctor.consultorio, doctor.correo]);
    }

    async deleteDoctorById(id:number){
        const dbConnection = await connection();
        //Logic delete. Change status "active" to zero for an inactive doctor.
        await dbConnection.query("UPDATE doctores SET activo=0 WHERE id=?", [id]);
    }

    //Get all doctors by their specialty.Shows all doctors who were or are active un CowSalud EPS
    async getDoctorBySpecialty(specialty:string){
        const dbConnection = await connection();
        const [doctor] = await dbConnection.query("SELECT * FROM doctores WHERE LOWER(especialidad) LIKE ?", [`%${specialty.toLowerCase()}%`]);
        return doctor;
    }

    //Get all doctors by their specialty. Shows just who are active at this moment in CowSalud EPS
    async getDoctorActiveBySpecialty(specialty:string){
        const dbConnection = await connection();
        const [doctor] = await dbConnection.query("SELECT * FROM doctores WHERE LOWER(especialidad) LIKE ? AND activo=1", [`%${specialty.toLowerCase()}%`]);
        return doctor;
    }
}

export default DoctorService;

