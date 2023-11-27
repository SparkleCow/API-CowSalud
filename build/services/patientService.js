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
const database_1 = require("../repository/database");
//Patient CRUD
class PatientService {
    constructor() { }
    //Get all patients who were or are affiliates in CowSalud EPS
    getAllPatients() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConnection = yield (0, database_1.connection)();
            const [result] = yield dbConnection.query("SELECT * FROM pacientes");
            return result;
        });
    }
    //Get all patients who are currently affiliates in CowSalud EPS
    getAllActivePatients() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConnection = yield (0, database_1.connection)();
            const [result] = yield dbConnection.query("SELECT * FROM pacientes WHERE activo=1");
            return result;
        });
    }
    getPatientById(cedula) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConnection = yield (0, database_1.connection)();
            const [result] = yield dbConnection.query("SELECT * FROM pacientes WHERE numero_cedula=? AND activo=1", [cedula]);
            if (result.length > 0) {
                return result;
            }
            return null;
        });
    }
    createPatient(patient) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConnection = yield (0, database_1.connection)();
            yield dbConnection.query("INSERT INTO pacientes (numero_cedula, nombre, apellido, edad, telefono, activo) VALUES (?, ?, ?, ?, ?,1)", [patient.cedula, patient.nombre, patient.apellido, patient.edad, patient.telefono]);
        });
    }
    updatePatientById(cedula, patient) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConnection = yield (0, database_1.connection)();
            const [result] = yield dbConnection.query("SELECT * FROM pacientes WHERE numero_cedula=? AND activo=1", [cedula]);
            if (result.length > 0) {
                const patientResult = result[0];
                if (patient.edad === undefined || patient.edad === null) {
                    patient.edad = patientResult.edad;
                }
                if (patient.telefono == null || patient.edad === undefined) {
                    patient.telefono = patientResult.telefono;
                }
                yield dbConnection.query("UPDATE pacientes SET edad=?, telefono=? WHERE numero_cedula=?", [patient.edad, patient.telefono, cedula]);
                return true;
            }
            return false;
        });
    }
    deletePatientById(cedula) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConnection = yield (0, database_1.connection)();
            //Logic delete. Change status "active" to zero for an inactive patient.
            yield dbConnection.query("UPDATE pacientes SET activo=0 WHERE numero_cedula=?", [cedula]);
        });
    }
}
exports.default = PatientService;
