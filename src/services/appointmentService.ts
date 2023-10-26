import { connection } from "../repository/database"
import { Appointment } from "../entities/appointment"
import { App } from "../app";
 
 
class AppointmentService{
    constructor(){}

    async getAllAppointmentByPatientId(cedula:number){
        const dbConnection = await connection();
        const [appointment] = await dbConnection.query(`
            SELECT a.numero_cedula, CONCAT(a.nombre, ' ', a.apellido) AS nombre_paciente, 
            CONCAT(c.nombre, ' ', c.apellido) AS nombre_doctor, c.especialidad AS especialidad_doctor,
            c.consultorio
            FROM pacientes AS a 
            INNER JOIN doctor_pacientes AS b ON a.numero_cedula = b.id_paciente 
            INNER JOIN doctores AS c ON c.id = b.id_doctor;
`       );
        return appointment;
    }
}

export default AppointmentService;