"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
class Doctor {
    constructor(id, nombre, apellido, especialidad, consultorio, correo) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.especialidad = especialidad;
        this.consultorio = consultorio;
        this.correo = correo;
    }
}
exports.Doctor = Doctor;
