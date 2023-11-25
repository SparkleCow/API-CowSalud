import { Router } from "express"
import { getAllAppointments, getAppointmentBySpecialty, createAppointment, getAllAppointmentByPatientId } from "../controllers/appointmentController"

const appointmentRouter = Router();

appointmentRouter.route("/appointment/filter")
    .get(getAppointmentBySpecialty);

appointmentRouter.route("/appointment/:id")
    .get(getAllAppointmentByPatientId);

appointmentRouter.route("/appointment")
    .post(createAppointment)
    .get(getAllAppointments);

export default appointmentRouter;