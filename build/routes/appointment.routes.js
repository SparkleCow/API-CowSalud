"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentController_1 = require("../controllers/appointmentController");
const appointmentRouter = (0, express_1.Router)();
appointmentRouter.route("/appointment/:id")
    .get(appointmentController_1.getAllAppointmentByPatientId);
appointmentRouter.route("/appointment")
    .post(appointmentController_1.createAppointment);
exports.default = appointmentRouter;
