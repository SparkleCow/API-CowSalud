import { Router } from "express"
import { getDoctorById, getAllDoctors, createDoctor } from "../controllers/doctorController"


const doctorRouter = Router();

doctorRouter.route("/doctor/:id")
        .get(getDoctorById);

doctorRouter.route("/doctor")
        .get(getAllDoctors)
        .post(createDoctor);

export default doctorRouter; 