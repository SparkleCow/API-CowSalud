import express, {Application} from "express";
import morgan from "morgan"
import bodyParser from "body-parser";

/*Routes*/
import doctorRouter from "./routes/doctor.routes";
import patientRouter from "./routes/patient.routes";
import appointmentRouter from "./routes/appointment.routes";


export class App {
    private app: Application;
    private port: number | string;

    constructor(port : number | string){
        this.app = express();
        this.port = port;
        this.middleware();
        this.routes();
        this.settings();
        
    }

    settings(){
        this.app.set("port", this.port || process.env.PORT || 3000);
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
        await this.app.listen(this.port);
        console.log("Server on port",this.port);
    }
}