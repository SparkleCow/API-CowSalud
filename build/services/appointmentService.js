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
const database_1 = require("../repository/database");
const patientService_1 = __importDefault(require("./patientService"));
const doctorService_1 = __importDefault(require("./doctorService"));
const appointmentValidation_1 = require("./appointmentValidation");
const repeatPatient_1 = require("../Exceptions/repeatPatient");
const busyDoctor_1 = require("../Exceptions/busyDoctor");
const doubleAppointment_1 = require("../Exceptions/doubleAppointment");
const patientService = new patientService_1.default();
const doctorService = new doctorService_1.default();
class AppointmentService {
    constructor() { }
    getAllAppointmentByPatientId(cedula) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConnection = yield (0, database_1.connection)();
            const [appointment] = yield dbConnection.query(`
            SELECT a.numero_cedula, CONCAT(a.nombre, ' ', a.apellido) AS nombre_paciente, 
            CONCAT(c.nombre, ' ', c.apellido) AS nombre_doctor, c.especialidad AS especialidad_doctor,
            c.consultorio, DATE_FORMAT(b.fecha, '%Y-%m-%d') AS fecha, TIME(b.fecha) AS hora
            FROM pacientes AS a 
            INNER JOIN citas AS b ON a.numero_cedula = b.id_paciente 
            INNER JOIN doctores AS c ON c.id = b.id_doctor WHERE a.numero_cedula=?;`, [cedula]);
            if (Array.isArray(appointment) && appointment.length > 0)
                return appointment;
            return null;
        });
    }
    createAppointment(doctorId, patientId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataPatient = yield patientService.getPatientById(patientId);
            const dataDoctor = yield doctorService.getDoctorById(doctorId);
            const appointmentDay = date.toString().split(" ")[0];
            //Validate that there is only one appointment by day between a patient and a doctor.
            if (yield (0, appointmentValidation_1.isRepeatPatient)(doctorId, patientId, appointmentDay)) {
                throw new repeatPatient_1.RepeatPatient("El paciente ya tuvó una cita previa con este doctor el día de hoy. No es posible volver a agendar.");
            }
            //Validate that the doctor does not have an appointment at the indicate time
            if (yield (0, appointmentValidation_1.isBusyHour)(doctorId, date)) {
                throw new busyDoctor_1.BusyDoctor("El doctor se encuentra ocupado en este momento. Selecciona otro horario para tú cita.");
            }
            //Validate that there isnt a patient with double appointment at the same time.
            if (yield (0, appointmentValidation_1.isDoubleAppointment)(patientId, date)) {
                throw new doubleAppointment_1.DoubleAppointment("Ya tienes una cita agendada para esta fecha. Selecciona otro horario para tú cita.");
            }
            const dbConnection = yield (0, database_1.connection)();
            yield dbConnection.query("INSERT INTO citas values (?,?,?)", [dataDoctor[0].id, dataPatient[0].numero_cedula, date]);
            return true;
        });
    }
}
exports.default = AppointmentService;
