"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoubleAppointment = void 0;
class DoubleAppointment extends Error {
    constructor(message) {
        super(message);
        this.name = 'DoubleAppointment';
    }
}
exports.DoubleAppointment = DoubleAppointment;
