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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDoubleAppointment = exports.isBusyHour = exports.isRepeatPatient = void 0;
const database_1 = require("../repository/database");
//Validate that there is only one appointment by day between a patient and a doctor.
function isRepeatPatient(doctorId, patientId, date) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbConnection = yield (0, database_1.connection)();
        const [appointment] = yield dbConnection.query("SELECT * FROM citas WHERE id_doctor=? AND id_paciente=? AND fecha LIKE ?", [doctorId, patientId, `%${date}%`]);
        return Array.isArray(appointment) && appointment.length > 0;
    });
}
exports.isRepeatPatient = isRepeatPatient;
//Validate that the doctor does not have an appointment at the indicate time
function isBusyHour(doctorId, date) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbConnection = yield (0, database_1.connection)();
        const [appointment] = yield dbConnection.query("SELECT * FROM citas WHERE id_doctor=? AND fecha=?", [doctorId, date]);
        return Array.isArray(appointment) && appointment.length > 0;
    });
}
exports.isBusyHour = isBusyHour;
//Validate that there isnt a patient with double appointment at the same time.
function isDoubleAppointment(patientId, date) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbConnection = yield (0, database_1.connection)();
        const [appointment] = yield dbConnection.query("SELECT * FROM citas WHERE id_paciente=? AND fecha=?", [patientId, date]);
        return Array.isArray(appointment) && appointment.length > 0;
    });
}
exports.isDoubleAppointment = isDoubleAppointment;
