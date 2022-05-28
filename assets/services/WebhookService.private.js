"use strict";

const assets = Runtime.getAssets();
const axios = require('axios').default;
const Config = require(assets["/Config.js"].path);
const InvalidMessageWebhookModel = require(assets["/models/InvalidMessageWebhookModel.js"].path);

class WebhookService {
    sendInvalidMessage(message, phoneNumber) {
        const payload = new InvalidMessageWebhookModel(
            message, phoneNumber, "Invalid Message"
        );

        return this._send(payload.toJson());
    }

    _send(payload) {
        return axios.post(Config.WebhookUrl, payload);
    }
};

module.exports = WebhookService;
