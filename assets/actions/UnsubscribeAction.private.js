"use strict";

const assets = Runtime.getAssets();
const BaseAction = require(assets["/actions/BaseAction.js"].path);
const WebhookService = require(assets["/services/WebhookService.js"].path);

class UnsubscribeAction extends BaseAction {
    run() {
        const webhook = new WebhookService();

        return webhook
            .sendUnsubscribe(this.phoneNumber)
            .then(() => {
                return null; // Does not send a reply message
            });
    }
}

module.exports = UnsubscribeAction;
