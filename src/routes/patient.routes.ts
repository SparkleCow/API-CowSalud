import { Router } from "express"
import { updatePatientById, deletePatientById, createPatient, getPatientById, getAllActivePatient, getAllPatient} from "../controllers/patientController"


const patientRouter = Router();

patientRouter.route("/patient/all")
    .get(getAllPatient)

patientRouter.route("/patient/:id")
    .get(getPatientById)
    .delete(deletePatientById)
    .put(updatePatientById);

patientRouter.route("/patient")
    .get(getAllActivePatient)
    .post(createPatient);

export default patientRouter; 