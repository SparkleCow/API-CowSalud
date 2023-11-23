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
exports.createAppointment = exports.getAllAppointmentByPatientId = void 0;
const appointmentService_1 = __importDefault(require("../services/appointmentService"));
const repeatPatient_1 = require("../Exceptions/repeatPatient");
const busyDoctor_1 = require("../Exceptions/busyDoctor");
const doubleAppointment_1 = require("../Exceptions/doubleAppointment");
const service = new appointmentService_1.default();
function getAllAppointmentByPatientId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patientId = parseInt(req.params.id, 10);
            const appointment = yield service.getAllAppointmentByPatientId(patientId);
            if (appointment != null)
                return res.status(200).json(appointment);
            return res.status(204).json({ message: "No se encontraron citas" });
        }
        catch (error) {
            return res.status(500).json({ error: "Error al ver las citas del paciente." });
        }
    });
}
exports.getAllAppointmentByPatientId = getAllAppointmentByPatientId;
function createAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const appointmentData = req.body;
            const confirmation = yield service.createAppointment(appointmentData.id_doctor, appointmentData.id_paciente, appointmentData.fecha);
            if (confirmation) {
                return res.status(201).json({ message: "Cita creada con exito" });
            }
        }
        catch (error) {
            if (error instanceof repeatPatient_1.RepeatPatient || error instanceof busyDoctor_1.BusyDoctor || error instanceof doubleAppointment_1.DoubleAppointment) {
                return res.status(400).json({ error: error.message });
            }
            else {
                console.error("Error inesperado:", error);
                return res.status(500).json({ message: "Error interno del servidor" });
            }
        }
    });
}
exports.createAppointment = createAppointment;
