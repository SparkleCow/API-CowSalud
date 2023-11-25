import { Router } from "express"
import { updateDoctorById, getDoctorById, getAllDoctors, createDoctor, deleteDoctor, getDoctorActiveBySpecialty, getAllActiveDoctors} from "../controllers/doctorController"


const doctorRouter = Router();

doctorRouter.route("/doctor")
        .get(getAllActiveDoctors)
        .post(createDoctor);

doctorRouter.route("/doctor/all")
        .get(getAllDoctors);

doctorRouter.route("/doctor/filter") 
        .get(getDoctorActiveBySpecialty);

doctorRouter.route("/doctor/:id")
        .delete(deleteDoctor)
        .get(getDoctorById)
        .put(updateDoctorById);
        
export default doctorRouter; 