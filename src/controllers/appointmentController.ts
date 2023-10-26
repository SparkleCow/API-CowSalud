import { Request, Response } from "express";
import AppointmentService from "../services/appointmentService"

const service = new AppointmentService();

export async function getAllAppointmentByPatientId(req: Request, res:Response):Promise<Response>{
    const patientId = parseInt(req.params.id, 10)
    const appointment = await service.getAllAppointmentByPatientId(patientId);
    return res.status(200).json(appointment);
}