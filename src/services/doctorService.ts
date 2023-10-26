import { connection } from "../repository/database"
import { Doctor } from "../entities/doctor"

class DoctorService{

    constructor(){
    }

    //Métodos CRUD de la entidad doctor
    async getAllDoctors(){
        const dbConnection = await connection();
        const [result] = await dbConnection.query("SELECT * FROM doctores");
        return result;
    }

    async getDoctorById(id:number){
        const dbConnection = await connection();
        const [result] = await dbConnection.query("SELECT * FROM doctores WHERE id=?", [id]);
        return result;
    }

    async createDoctor(doctor:Doctor){
        const dbConnection = await connection();
        await dbConnection.query("INSERT INTO doctores (nombre, apellido, especialidad, consultorio, correo_electronico) values (?,?,?,?,?)",
        [doctor.nombre, doctor.apellido, doctor.especialidad, doctor.consultorio, doctor.correo]);
    }

    async deleteDoctorById(id:number){
        const dbConnection = await connection();
        await dbConnection.query("DELETE FROM doctores WHERE id=?", [id]);
    }

    async findDoctorBySpecialty(specialty:string){
        const dbConnection = await connection();
        await dbConnection.query("SELECT * FROM doctores WHERE especialidad LIKE ?", [`%${specialty}%`]);
    }
}

export default DoctorService;

