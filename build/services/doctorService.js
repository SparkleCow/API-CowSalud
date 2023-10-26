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
class DoctorService {
    constructor() { }
    //Metodos CRUD de los doctores
    getAllDoctors() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConnection = yield (0, database_1.connection)();
            const result = yield dbConnection.query("SELECT * FROM doctores");
            // Mapear los campos del resultado de la consulta al tipo Doctor
            const doctors = result.map((x) => {
                const doctor = {
                    id: x.id,
                    nombre: x.nombre,
                    apellido: x.apellido,
                    especialidad: x.especialidad,
                    consultorio: x.consultorio,
                    correo: x.consultorio
                };
                return doctor;
            });
            return doctors;
        });
    }
}
exports.default = DoctorService;
