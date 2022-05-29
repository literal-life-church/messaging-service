"use strict";

class NewSubscriberWebhookModel {
    constructor(phoneNumber, tags, type) {
        this.phoneNumber = phoneNumber;
        this.tags = tags;
        this.type = type;
    }

    toJson() {
        return {
            "phoneNumber": this.phoneNumber,
            "tags": this.tags,
            "type": this.type
        };
    }
}

module.exports = NewSubscriberWebhookModel;
