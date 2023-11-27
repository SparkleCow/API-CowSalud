"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctorController_1 = require("../controllers/doctorController");
const doctorRouter = (0, express_1.Router)();
doctorRouter.route("/doctor")
    .get(doctorController_1.getAllActiveDoctors)
    .post(doctorController_1.createDoctor);
doctorRouter.route("/doctor/all")
    .get(doctorController_1.getAllDoctors);
doctorRouter.route("/doctor/filter")
    .get(doctorController_1.getDoctorActiveBySpecialty);
doctorRouter.route("/doctor/:id")
    .delete(doctorController_1.deleteDoctor)
    .get(doctorController_1.getDoctorById)
    .put(doctorController_1.updateDoctorById);
exports.default = doctorRouter;
