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
//Doctor CRUD
class DoctorService {
    constructor() { }
    //Get all doctors who were or are active in CowSalud EPS
    getAllDoctors() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConnection = yield (0, database_1.connection)();
            const [result] = yield dbConnection.query("SELECT * FROM doctores");
            return result;
        });
    }
    //Get all doctors who are active at this moment in CowSalud EPS
    getAllActiveDoctors() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConnection = yield (0, database_1.connection)();
            const [result] = yield dbConnection.query("SELECT * FROM doctores WHERE activo=1");
            return result;
        });
    }
    getDoctorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConnection = yield (0, database_1.connection)();
            const [result] = yield dbConnection.query("SELECT * FROM doctores WHERE id=? AND activo=1", [id]);
            if (result.length > 0) {
                return result;
            }
            return null;
        });
    }
    createDoctor(doctor) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConnection = yield (0, database_1.connection)();
            yield dbConnection.query("INSERT INTO doctores (nombre, apellido, especialidad, consultorio, correo_electronico, activo) values (?,?,?,?,?,1)", [doctor.nombre, doctor.apellido, doctor.especialidad, doctor.consultorio, doctor.correo]);
        });
    }
    deleteDoctorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConnection = yield (0, database_1.connection)();
            //Logic delete. Change status "active" to zero for an inactive doctor.
            yield dbConnection.query("UPDATE doctores SET activo=0 WHERE id=?", [id]);
        });
    }
    //Get all doctors by their specialty.Shows all doctors who were or are active un CowSalud EPS
    getDoctorBySpecialty(specialty) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConnection = yield (0, database_1.connection)();
            const [doctor] = yield dbConnection.query("SELECT * FROM doctores WHERE LOWER(especialidad) LIKE ?", [`%${specialty.toLowerCase()}%`]);
            return doctor;
        });
    }
    //Get all doctors by their specialty. Shows just who are active at this moment in CowSalud EPS
    getDoctorActiveBySpecialty(specialty) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConnection = yield (0, database_1.connection)();
            const [doctor] = yield dbConnection.query("SELECT * FROM doctores WHERE LOWER(especialidad) LIKE ? AND activo=1", [`%${specialty.toLowerCase()}%`]);
            return doctor;
        });
    }
}
exports.default = DoctorService;
