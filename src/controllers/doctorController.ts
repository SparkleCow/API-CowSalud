import { Request, Response } from "express";
import DoctorService from "../services/doctorService"
import { Doctor } from "../entities/doctor";

//Instancia de DoctorService para implementar la logica del servicio CRUD
const service = new DoctorService();

export async function getAllDoctors(req: Request, res: Response): Promise<Response>{
    const doctors = await service.getAllDoctors();
    return res.status(200).json(doctors);
}

export async function getDoctorById(req: Request, res: Response): Promise<Response>{
    const doctorId = parseInt(req.params.id, 10);
    try{
        const doctor = await service.getDoctorById(doctorId);
        console.log(doctor);
        if (Array.isArray(doctor) && doctor.length > 0) {
            return res.status(200).json(doctor);
        } else {
            return res.status(404).json({ error: "Error, no se encontró el doctor" });
        }
    }catch(error){
        return res.status(400).json({ error: "Error, no se logro encontrar al doctor"})
    }
}

export async function createDoctor(req: Request, res: Response){
    const doctor:{ nombre:string, apellido:string, especialidad:string, consultorio:number, correo:string } = req.body;
    try{
        await service.createDoctor(doctor);
        return res.status(201).json({ message: "Doctor creado con éxito" })
    }catch(error){
        return res.status(400).json({ error: "Error, no se puedo cargar el doctor, revisa tus datos o intentalo más tarde"});
    }
}

export async function deleteDoctor(req: Request, res: Response){
    const doctorId = parseInt(req.params.id, 10)
    try {
        await service.deleteDoctorById(doctorId);
        return res.status(204).json({ message: "Doctor borrado con éxito" });
    }catch(error){
        console.error("Error al borrar el doctor:", error);
        return res.status(400).json({ error: "Error, verifique los datos del doctor a borrar o intentelo más tarde"});
    }
}

