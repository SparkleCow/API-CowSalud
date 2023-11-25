import { connection } from "../repository/database"
import PatientService from "./patientService"
import DoctorService from "./doctorService";
import { isRepeatPatient, isBusyHour, isDoubleAppointment } from "./appointmentValidation"
import { RepeatPatient } from "../exceptions/repeatPatient";
import { BusyDoctor } from "../exceptions/busyDoctor";
import { DoubleAppointment } from "../exceptions/doubleAppointment";

const patientService = new PatientService();
const doctorService = new DoctorService();
 
class AppointmentService{
    constructor(){}

    async getAllAppointmentByPatientId(cedula:number){
        const dbConnection = await connection();
        const [appointment] = await dbConnection.query(`
            SELECT a.numero_cedula, CONCAT(a.nombre, ' ', a.apellido) AS nombre_paciente, 
            CONCAT(c.nombre, ' ', c.apellido) AS nombre_doctor, c.especialidad AS especialidad_doctor,
            c.consultorio, DATE_FORMAT(b.fecha, '%Y-%m-%d') AS fecha, TIME(b.fecha) AS hora
            FROM pacientes AS a 
            INNER JOIN citas AS b ON a.numero_cedula = b.id_paciente 
            INNER JOIN doctores AS c ON c.id = b.id_doctor WHERE a.numero_cedula=?;`, [cedula]
        );
        if(Array.isArray(appointment) && appointment.length>0) return appointment;
        return null;
    }

    async createAppointment(doctorId:number,patientId:number, date:Date):Promise<Boolean>{
        const dataPatient:any = await patientService.getPatientById(patientId);
        const dataDoctor:any = await doctorService.getDoctorById(doctorId);
        const appointmentDay:string = date.toString().split(" ")[0]

        //Validate that there is only one appointment by day between a patient and a doctor.
        if(await isRepeatPatient(doctorId, patientId, appointmentDay)){
            throw new RepeatPatient("El paciente ya tuvó una cita previa con este doctor el día de hoy. No es posible volver a agendar.");
        }
        //Validate that the doctor does not have an appointment at the indicate time
        if(await isBusyHour(doctorId, date)){
            throw new BusyDoctor("El doctor se encuentra ocupado en este momento. Selecciona otro horario para tú cita.");
        }
        //Validate that there isnt a patient with double appointment at the same time.
        if(await isDoubleAppointment(patientId, date)){
               throw new DoubleAppointment("Ya tienes una cita agendada para esta fecha. Selecciona otro horario para tú cita.");
        }
    
        const dbConnection = await connection();
        await dbConnection.query("INSERT INTO citas values (?,?,?)", [dataDoctor[0].id, dataPatient[0].numero_cedula, date]);
        return true;
    }

    async getAppointmentBySpecialty(specialty:string){
        const dbConnection = await connection();
        const [appointment] = await dbConnection.query(`
            SELECT a.numero_cedula, CONCAT(a.nombre, ' ', a.apellido) AS nombre_paciente, 
            CONCAT(c.nombre, ' ', c.apellido) AS nombre_doctor, c.especialidad AS especialidad_doctor,
            c.consultorio, DATE_FORMAT(b.fecha, '%Y-%m-%d') AS fecha, TIME(b.fecha) AS hora
            FROM pacientes AS a 
            INNER JOIN citas AS b ON a.numero_cedula = b.id_paciente 
            INNER JOIN doctores AS c ON c.id = b.id_doctor WHERE c.especialidad LIKE ?;`, [`%${specialty.toLowerCase()}%`]
        );
        if(Array.isArray(appointment) && appointment.length>0) return appointment;
        return null;
    }

    async getAllAppointments(){
        const dbConnection = await connection();
        const [appointment] = await dbConnection.query(`
            SELECT a.numero_cedula, CONCAT(a.nombre, ' ', a.apellido) AS nombre_paciente, 
            CONCAT(c.nombre, ' ', c.apellido) AS nombre_doctor, c.especialidad AS especialidad_doctor,
            c.consultorio, DATE_FORMAT(b.fecha, '%Y-%m-%d') AS fecha, TIME(b.fecha) AS hora
            FROM pacientes AS a 
            INNER JOIN citas AS b ON a.numero_cedula = b.id_paciente 
            INNER JOIN doctores AS c ON c.id = b.id_doctor;`
        );
        if(Array.isArray(appointment) && appointment.length>0) return appointment;
        return null;
    }


}

export default AppointmentService;