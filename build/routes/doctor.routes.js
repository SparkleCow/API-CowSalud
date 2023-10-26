"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctorController_1 = require("../controllers/doctorController");
const doctorRouter = (0, express_1.Router)();
doctorRouter.route("/doctors")
    .get(doctorController_1.getAllDoctors);
exports.default = doctorRouter;
