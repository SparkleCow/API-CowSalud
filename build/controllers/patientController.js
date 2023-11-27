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
exports.updatePatientById = exports.deletePatientById = exports.createPatient = exports.getPatientById = exports.getAllPatient = exports.getAllActivePatient = void 0;
const patientService_1 = __importDefault(require("../services/patientService"));
const service = new patientService_1.default();
function getAllActivePatient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patients = yield service.getAllActivePatients();
            if (patients == null)
                return res.status(404).json({ message: "No se encontaron pacientes activos" });
            return res.status(200).json(patients);
        }
        catch (error) {
            return res.status(500).json({ message: "Error al intentar encontrar a los pacientes: ", error });
        }
    });
}
exports.getAllActivePatient = getAllActivePatient;
function getAllPatient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patients = yield service.getAllPatients();
            if (patients == null)
                return res.status(404).json({ message: "No se encontaron pacientes" });
            return res.status(200).json(patients);
        }
        catch (error) {
            return res.status(500).json({ message: "Error al intentar encontrar a los pacientes: ", error });
        }
    });
}
exports.getAllPatient = getAllPatient;
function getPatientById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patientId = parseInt(req.params.id, 10);
            const patient = yield service.getPatientById(patientId);
            if (patient != null)
                return res.status(200).json(patient);
            return res.status(404).json({ message: "No se encontro al paciente en el sistema o no se encuentra activo" });
        }
        catch (error) {
            return res.status(500).json({ message: "Error al intentar encontrar al paciente: ", error });
        }
    });
}
exports.getPatientById = getPatientById;
function createPatient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const patient = req.body;
        try {
            yield service.createPatient(patient);
            return res.status(201).json({ message: "Paciente creado con éxito" });
        }
        catch (error) {
            return res.status(400).json({ error: "Error, verifique sus datos personales" });
        }
    });
}
exports.createPatient = createPatient;
function deletePatientById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const patientId = parseInt(req.params.id, 10);
        try {
            yield service.deletePatientById(patientId);
            return res.status(204).json({ message: "Paciente borrado con éxito" });
        }
        catch (error) {
            return res.status(400).json({ error: "Error, verifique los datos del usuario a borrar o intentelo más tarde" });
        }
    });
}
exports.deletePatientById = deletePatientById;
function updatePatientById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patientId = parseInt(req.params.id, 10);
            const patientDTO = req.body;
            const confirmation = yield service.updatePatientById(patientId, patientDTO);
            if (confirmation)
                return res.status(204).json({ message: "Paciente modificado con éxito" });
            return res.status(404).json({ error: "Error, no se encontro al paciente." });
        }
        catch (error) {
            return res.status(400).json({ error: "Error, verifique los datos a actualizar o intentelo más tarde" });
        }
    });
}
exports.updatePatientById = updatePatientById;
