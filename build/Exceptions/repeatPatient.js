"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeatPatient = void 0;
class RepeatPatient extends Error {
    constructor(message) {
        super(message);
        this.name = 'RepeatPatient';
    }
}
exports.RepeatPatient = RepeatPatient;
