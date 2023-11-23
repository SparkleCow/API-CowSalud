import { Router } from "express"
import { createAppointment, getAllAppointmentByPatientId } from "../controllers/appointmentController"

const appointmentRouter = Router();

appointmentRouter.route("/appointment/:id")
    .get(getAllAppointmentByPatientId);

appointmentRouter.route("/appointment")
    .post(createAppointment);

export default appointmentRouter;