"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patientController_1 = require("../controllers/patientController");
const patientRouter = (0, express_1.Router)();
patientRouter.route("/patient/all")
    .get(patientController_1.getAllPatient);
patientRouter.route("/patient/:id")
    .get(patientController_1.getPatientById)
    .delete(patientController_1.deletePatientById)
    .put(patientController_1.updatePatientById);
patientRouter.route("/patient")
    .get(patientController_1.getAllActivePatient)
    .post(patientController_1.createPatient);
exports.default = patientRouter;
