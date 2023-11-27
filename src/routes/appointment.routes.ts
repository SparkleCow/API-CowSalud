import { Router } from "express"
import { getAllAppointmentByDoctorId, getAllAppointments, getAppointmentBySpecialty, createAppointment, getAllAppointmentByPatientId } from "../controllers/appointmentController"

const appointmentRouter = Router();

appointmentRouter.route("/appointment/filter")
    .get(getAppointmentBySpecialty);

appointmentRouter.route("/appointment/:id")
    .get(getAllAppointmentByPatientId);

appointmentRouter.route("/appointment/doctor/:id")
    .get(getAllAppointmentByDoctorId)

appointmentRouter.route("/appointment")
    .post(createAppointment)
    .get(getAllAppointments);

export default appointmentRouter;