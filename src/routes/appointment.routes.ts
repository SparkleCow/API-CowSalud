import { Router } from "express"
import { getAllAppointmentByPatientId } from "../controllers/appointmentController"

const appointmentRouter = Router();

appointmentRouter.route("/appointment")
    .get(getAllAppointmentByPatientId);

export default appointmentRouter;