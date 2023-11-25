import { Request, Response } from "express";
import AppointmentService from "../services/appointmentService"
import { Appointment } from "../entities/appointment";
import { AppointmentData } from "../entities/appointmentData";
import { RepeatPatient } from '../exceptions/repeatPatient';
import { BusyDoctor } from '../exceptions/busyDoctor';
import { DoubleAppointment } from '../exceptions/doubleAppointment';

const service = new AppointmentService();

export async function getAllAppointmentByPatientId(req: Request, res:Response):Promise<Response>{
    try {
        const patientId = parseInt(req.params.id, 10)
        const appointment = await service.getAllAppointmentByPatientId(patientId);
        if(appointment!=null) return res.status(200).json(appointment);
        return res.status(404).json({ message: "No se encontraron citas" });
    } catch (error) {
        return res.status(500).json({error: "Error al ver las citas del paciente."})
    }
}

export async function createAppointment(req: Request, res:Response){
    try{
        const appointmentData:AppointmentData = req.body
        const confirmation = await service.createAppointment(appointmentData.id_doctor, appointmentData.id_paciente, appointmentData.fecha);
        if(confirmation){
            return res.status(201).json({message: "Cita creada con exito"});
        }
    }catch(error){
        if (error instanceof RepeatPatient|| error instanceof BusyDoctor || error instanceof DoubleAppointment) {
            return res.status(400).json({ error: error.message });
        }else {
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}

export async function getAppointmentBySpecialty(req: Request, res:Response){
    try {
        const specialty = req.query.specialty as string;
        const appointmentSpecialty = await service.getAppointmentBySpecialty(specialty);
        if(appointmentSpecialty!=null) return res.status(200).json(appointmentSpecialty);
        return res.status(404).json({ message: "No se encontraron citas" });
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export async function getAllAppointments(req: Request, res:Response){
    try {
        const appointments = await service.getAllAppointments();
        if(appointments!=null) return res.status(200).json(appointments);
        return res.status(404).json({ message: "No se encontraron citas" });
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}