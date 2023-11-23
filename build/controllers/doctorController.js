"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoctorActiveBySpecialty = exports.getDoctorBySpecialty = exports.deleteDoctor = exports.createDoctor = exports.getDoctorById = exports.getAllActiveDoctors = exports.getAllDoctors = void 0;
const doctorService_1 = __importDefault(require("../services/doctorService"));
const service = new doctorService_1.default();
function getAllDoctors(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctors = yield service.getAllDoctors();
            return res.status(200).json(doctors);
        }
        catch (error) {
            return res.status(500).json({ error: "Error al traer la información de los doctores. Intentelo más tarde" });
        }
    });
}
exports.getAllDoctors = getAllDoctors;
function getAllActiveDoctors(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctors = yield service.getAllActiveDoctors();
            return res.status(200).json(doctors);
        }
        catch (error) {
            return res.status(500).json({ error: "Error al traer la información de los doctores. Intentelo más tarde" });
        }
    });
}
exports.getAllActiveDoctors = getAllActiveDoctors;
function getDoctorById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctorId = parseInt(req.params.id, 10);
            const doctor = yield service.getDoctorById(doctorId);
            if (Array.isArray(doctor) && doctor.length > 0 && doctor != null) {
                return res.status(200).json(doctor);
            }
            else {
                return res.status(404).json({ error: "Error, no se encontró el doctor" });
            }
        }
        catch (error) {
            return res.status(500).json({ error: "Error, no se logro encontrar al doctor" });
        }
    });
}
exports.getDoctorById = getDoctorById;
function createDoctor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctor = req.body;
            yield service.createDoctor(doctor);
            return res.status(201).json({ message: "Doctor creado con éxito" });
        }
        catch (error) {
            return res.status(400).json({ error: "Error, no se puedo cargar el doctor, revisa tus datos o intentalo más tarde" });
        }
    });
}
exports.createDoctor = createDoctor;
function deleteDoctor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctorId = parseInt(req.params.id, 10);
            yield service.deleteDoctorById(doctorId);
            return res.status(204).json({ message: "Doctor borrado con éxito" });
        }
        catch (error) {
            return res.status(400).json({ error: "Error, verifique los datos del doctor a borrar o intentelo más tarde" });
        }
    });
}
exports.deleteDoctor = deleteDoctor;
function getDoctorBySpecialty(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctorSpecialty = req.params.specialty;
            const doctorsBySpecialty = yield service.getDoctorBySpecialty(doctorSpecialty);
            if (Array.isArray(doctorsBySpecialty) && doctorsBySpecialty.length > 0)
                return res.status(200).json(doctorsBySpecialty);
            return res.status(404).json({ message: "No se encontraron doctores con esta especialidad por el momento" });
        }
        catch (error) {
            return res.status(400).json({ error: "Error, verifique los datos del doctor o intentelo más tarde" });
        }
    });
}
exports.getDoctorBySpecialty = getDoctorBySpecialty;
function getDoctorActiveBySpecialty(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctorSpecialty = req.params.specialty;
            const doctorsBySpecialty = yield service.getDoctorActiveBySpecialty(doctorSpecialty);
            if (Array.isArray(doctorsBySpecialty) && doctorsBySpecialty.length > 0)
                return res.status(200).json(doctorsBySpecialty);
            return res.status(404).json({ message: "No se encontraron doctores activos con esta especialidad por el momento" });
        }
        catch (error) {
            return res.status(400).json({ error: "Error, verifique los datos del doctor o intentelo más tarde" });
        }
    });
}
exports.getDoctorActiveBySpecialty = getDoctorActiveBySpecialty;
