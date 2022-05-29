"use strict";

class UnsubscribeWebhookModel {
    constructor(phoneNumber, type) {
        this.phoneNumber = phoneNumber;
        this.type = type;
    }

    toJson() {
        return {
            "phoneNumber": this.phoneNumber,
            "type": this.type
        };
    }
}

module.exports = UnsubscribeWebhookModel;
