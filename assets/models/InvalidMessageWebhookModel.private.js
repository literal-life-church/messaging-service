"use strict";

class InvalidMessageWebhookModel {
    constructor(message, phoneNumber, type) {
        this.message = message;
        this.phoneNumber = phoneNumber;
        this.type = type;
    }

    toJson() {
        return {
            "message": this.message,
            "phoneNumber": this.phoneNumber,
            "type": this.type
        };
    }
}

module.exports = InvalidMessageWebhookModel;
