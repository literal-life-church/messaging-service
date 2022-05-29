"use strict";

const assets = Runtime.getAssets();
const BaseAction = require(assets["/actions/BaseAction.js"].path);
const WebhookService = require(assets["/services/WebhookService.js"].path);

class ResubscribeAction extends BaseAction {
    run(message) {
        let commaSeparatedTags = null;
        const phoneNumber = this.phoneNumber;
        let tags = null;
        const webhook = new WebhookService();

        return this._isPhoneNumberAlreadyRegistered()
            .then(registrationStatus => {
                commaSeparatedTags = registrationStatus.commaSeparatedTags;
                tags = registrationStatus.tags;
                return webhook.sendResubscribe(phoneNumber, tags);
            })
            .then(() => {
                let finalMessage = message.replace("{tags}", commaSeparatedTags);
                return finalMessage;
            })
    }
}

module.exports = ResubscribeAction;
