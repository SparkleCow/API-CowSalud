import { Router } from "express"
import { updatePatientById, deletePatientById, createPatient, getPatientById, getAllActivePatient, getAllPatient} from "../controllers/patientController"


const patientRouter = Router();

patientRouter.route("/patient/:id")
    .get(getPatientById)
    .delete(deletePatientById)
    .put(updatePatientById);

patientRouter.route("/patient")
    .get(getAllActivePatient)
    .post(createPatient);

patientRouter.route("/patient/all")
    .get(getAllPatient)



export default patientRouter; 