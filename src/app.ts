import express, {Application} from "express";
import morgan from "morgan"
import bodyParser from "body-parser";

/*Routes*/
import doctorRouter from "./routes/doctor.routes";
import patientRouter from "./routes/patient.routes";
import appointmentRouter from "./routes/appointment.routes";

const config = require("./config/config.js");

//Server settings
export class App {
    private app: Application;

    constructor(){
        this.app = express();
        this.middleware();
        this.routes();
    }

    middleware(){
        this.app.use(morgan("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    routes(){
        this.app.use(doctorRouter);
        this.app.use(patientRouter);
        this.app.use(appointmentRouter);
    } 

    async listen(){
        this.app.listen(config.PORT);
        console.log(`Server on port ${config.PORT}`);
    }
}