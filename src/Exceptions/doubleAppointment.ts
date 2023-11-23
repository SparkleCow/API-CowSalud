export class DoubleAppointment extends Error {
    constructor(message:string) {
        super(message);
        this.name = 'DoubleAppointment';
    }
}