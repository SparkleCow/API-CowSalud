import { Request, Response } from "express";
import PatientService from "../services/patientService"
import { PatientDTO } from "../entities/patient"

const service = new PatientService();

export async function getAllActivePatient(req: Request, res:Response):Promise<Response>{
    try {
        const patients = await service.getAllActivePatients();
        if(patients==null) return res.status(404).json({message: "No se encontaron pacientes activos"});
        return res.status(200).json(patients);
    } catch (error) {
        return res.status(500).json({message: "Error al intentar encontrar a los pacientes: ", error});
    }
}

export async function getAllPatient(req: Request, res:Response):Promise<Response>{
    try {
        const patients = await service.getAllPatients();
        if(patients==null) return res.status(404).json({message: "No se encontaron pacientes"});
        return res.status(200).json(patients);
    } catch (error) {
        return res.status(500).json({message: "Error al intentar encontrar a los pacientes: ", error});
    } 
}

export async function getPatientById(req: Request, res:Response):Promise<Response>{
    try {
        const patientId = parseInt(req.params.id, 10)
        const patient = await service.getPatientById(patientId);
        if(patient!=null) return res.status(200).json(patient);
        return res.status(404).json({message: "No se encontro al paciente en el sistema o no se encuentra activo"});
    } catch (error) {
        return res.status(500).json({message: "Error al intentar encontrar al paciente: ", error});
    }
}

export async function createPatient(req: Request, res:Response):Promise<Response>{
    const patient: {cedula: number, nombre: string, apellido: string, edad: number, telefono: number, activo:number} = req.body;
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
        return res.status(400).json({ error: "Error, verifique los datos del usuario a borrar o intentelo más tarde"});
    }
}

export async function updatePatientById(req: Request, res:Response){
    try {
        const patientId = parseInt(req.params.id, 10)
        const patientDTO:PatientDTO = req.body;
        const confirmation = await service.updatePatientById(patientId, patientDTO);
        if(confirmation) return res.status(204).json({ message: "Paciente modificado con éxito" });
        return res.status(404).json({ error: "Error, no se encontro al paciente."});
    } catch (error) {
        return res.status(400).json({ error: "Error, verifique los datos a actualizar o intentelo más tarde"});
    }
}
