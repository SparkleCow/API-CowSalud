import { connection } from "../repository/database"


//Validate that there is only one appointment by day between a patient and a doctor.
export async function isRepeatPatient(doctorId:number, patientId:number, date:string):Promise<Boolean>{
    const dbConnection = await connection();
    const [appointment] = await dbConnection.query("SELECT * FROM citas WHERE id_doctor=? AND id_paciente=? AND fecha LIKE ?", [doctorId, patientId, `%${date}%`]);
    return Array.isArray(appointment) && appointment.length > 0
}

//Validate that the doctor does not have an appointment at the indicate time
export async function isBusyHour(doctorId:number, date:Date){
    const dbConnection = await connection();
    const [appointment] = await dbConnection.query("SELECT * FROM citas WHERE id_doctor=? AND fecha=?",[doctorId, date]);
    return Array.isArray(appointment) && appointment.length > 0
}   

//Validate that there isnt a patient with double appointment at the same time.
export async function isDoubleAppointment(patientId:number, date:Date){
    const dbConnection = await connection();
    const [appointment] = await dbConnection.query("SELECT * FROM citas WHERE id_paciente=? AND fecha=?",[patientId, date]);
    return Array.isArray(appointment) && appointment.length > 0
}


