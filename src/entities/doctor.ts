export interface Doctor{
    nombre:string;
    apellido:string;
    especialidad:string;
    consultorio:number;
    correo:string;
    activo:number;
}

export interface DoctorDTO{
    consultorio?:number;
    correo?:string;
}