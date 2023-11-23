"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusyDoctor = void 0;
class BusyDoctor extends Error {
    constructor(message) {
        super(message);
        this.name = 'BusyDoctor';
    }
}
exports.BusyDoctor = BusyDoctor;
