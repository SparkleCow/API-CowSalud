export interface Patient{
    cedula:number
    nombre:string;
    apellido:string;
    edad:number;
    telefono:number;
    activo:number;
}

export interface PatientDTO{
    edad?:number,
    telefono?:number
}

