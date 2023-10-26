import { Request, Response } from "express";
import PatientService from "../services/patientService"

const service = new PatientService();

export async function getAllPatient(req: Request, res:Response):Promise<Response>{
    const patients = await service.getAllPatients();
    console.log(patients);
    return res.status(200).json(patients);
}

export async function getPatientById(req: Request, res:Response):Promise<Response>{
    const patientId = parseInt(req.params.id, 10)
    const patients = await service.getPatientById(patientId);
    return res.status(200).json(patients);
}

export async function createPatient(req: Request, res:Response):Promise<Response>{
    const patient: { cedula: number, nombre: string, apellido: string, edad: number, telefono: number } = req.body;
    try {
        await service.createPatient(patient);
        return res.status(201).json({ message: "Paciente creado con éxito" });
    } catch (error) {
        return res.status(400).json({ error: "Error, verifique sus datos personales"});
    }
}

export async function deletePatientById(req: Request, res:Response):Promise<Response>{
    const patientId = parseInt(req.params.id, 10)
    try {
        await service.deletePatientById(patientId);
        return res.status(204).json({ message: "Paciente borrado con éxito" });
    }catch(error){
        console.error("Error al borrar el paciente:", error);
        return res.status(400).json({ error: "Error, verifique los datos del usuario a borrar o intentelo más tarde"});
    }
}
