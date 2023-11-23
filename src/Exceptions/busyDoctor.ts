export class BusyDoctor extends Error {
    constructor(message:string) {
        super(message);
        this.name = 'BusyDoctor';
    }
}