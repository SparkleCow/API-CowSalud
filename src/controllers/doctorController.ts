import { Request, Response } from "express";
import DoctorService from "../services/doctorService"
import { Doctor } from "../entities/doctor";

const service = new DoctorService();

export async function getAllDoctors(req: Request, res: Response): Promise<Response>{
    try{
        const doctors = await service.getAllDoctors();
        return res.status(200).json(doctors);
    }catch(error){
        return res.status(500).json({error: "Error al traer la información de los doctores. Intentelo más tarde"});
    }
}

export async function getAllActiveDoctors(req: Request, res: Response): Promise<Response>{
    try {
        const doctors = await service.getAllActiveDoctors();
        return res.status(200).json(doctors); 
    } catch (error) {
        return res.status(500).json({error: "Error al traer la información de los doctores. Intentelo más tarde"});
    }
   
}

export async function getDoctorById(req: Request, res: Response): Promise<Response>{
    try{
        const doctorId = parseInt(req.params.id, 10);
        const doctor:Doctor = await service.getDoctorById(doctorId);
        if (Array.isArray(doctor) && doctor.length > 0 && doctor!=null) {
            return res.status(200).json(doctor);
        } else {
            return res.status(404).json({ error: "Error, no se encontró el doctor" });
        }
    }catch(error){
        return res.status(500).json({ error: "Error, no se logro encontrar al doctor"})
    }
}

export async function createDoctor(req: Request, res: Response){
    try{
        const doctor:{ nombre:string, apellido:string, especialidad:string, consultorio:number, correo:string, activo:number} = req.body;
        await service.createDoctor(doctor);
        return res.status(201).json({ message: "Doctor creado con éxito" })
    }catch(error){
        return res.status(400).json({ error: "Error, no se puedo cargar el doctor, revisa tus datos o intentalo más tarde"});
    }
}

export async function deleteDoctor(req: Request, res: Response){
    try {
        const doctorId = parseInt(req.params.id, 10)
        await service.deleteDoctorById(doctorId);
        return res.status(204).json({ message: "Doctor borrado con éxito" });
    }catch(error){
        return res.status(400).json({ error: "Error, verifique los datos del doctor a borrar o intentelo más tarde"});
    }
}

export async function getDoctorBySpecialty(req: Request, res: Response){
    try {
        const doctorSpecialty = req.params.specialty;
        const doctorsBySpecialty = await service.getDoctorBySpecialty(doctorSpecialty);
        if (Array.isArray(doctorsBySpecialty) && doctorsBySpecialty.length > 0) return res.status(200).json(doctorsBySpecialty);
        return res.status(404).json({ message: "No se encontraron doctores con esta especialidad por el momento"});
    }catch(error){
        return res.status(400).json({ error: "Error, verifique los datos del doctor o intentelo más tarde"});
    }
}


export async function getDoctorActiveBySpecialty(req: Request, res: Response){
    try {
        const doctorSpecialty = req.params.specialty;
        const doctorsBySpecialty = await service.getDoctorActiveBySpecialty(doctorSpecialty);
        if (Array.isArray(doctorsBySpecialty) && doctorsBySpecialty.length > 0) return res.status(200).json(doctorsBySpecialty);
        return res.status(404).json({ message: "No se encontraron doctores activos con esta especialidad por el momento"});
    }catch(error){
        return res.status(400).json({ error: "Error, verifique los datos del doctor o intentelo más tarde"});
    }
}
