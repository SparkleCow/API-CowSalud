import { Router } from "express"
import { getDoctorBySpecialty, getDoctorById, getAllDoctors, createDoctor, deleteDoctor, getDoctorActiveBySpecialty, getAllActiveDoctors} from "../controllers/doctorController"


const doctorRouter = Router();

doctorRouter.route("/doctor")
        .get(getAllActiveDoctors)
        .post(createDoctor);

doctorRouter.route("/doctor/all")
        .get(getAllDoctors);

doctorRouter.route("/doctor/:id")
        .delete(deleteDoctor)
        .get(getDoctorById);
        
doctorRouter.route("/doctor/spc/:specialty") //Enhance route
        .get(getDoctorActiveBySpecialty);

doctorRouter.route("/doctor/all/spc/:specialty") //Enhance route
        .get(getDoctorBySpecialty);

export default doctorRouter; 