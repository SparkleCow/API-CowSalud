import { Router } from "express"
import { deletePatientById, createPatient, getPatientById, getAllPatient } from "../controllers/patientController"


const patientRouter = Router();

patientRouter.route("/patient")
    .get(getAllPatient)
    .post(createPatient);

patientRouter.route("/patient/:id")
    .get(getPatientById)
    .delete(deletePatientById);

export default patientRouter; 