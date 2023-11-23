import { Router } from "express"
import { deletePatientById, createPatient, getPatientById, getAllActivePatient, getAllPatient} from "../controllers/patientController"


const patientRouter = Router();

patientRouter.route("/patient")
    .get(getAllActivePatient)
    .post(createPatient);

patientRouter.route("/patient/all")
    .get(getAllPatient)

patientRouter.route("/patient/:id")
    .get(getPatientById)
    .delete(deletePatientById);

export default patientRouter; 