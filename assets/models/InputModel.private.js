"use strict";

class InputModel {
    constructor(phoneNumber, command, message) {
        this.phoneNumber = phoneNumber;
        this.command = command;
        this.message = message;
    }
}

module.exports = InputModel;
