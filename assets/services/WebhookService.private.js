"use strict";

const assets = Runtime.getAssets();
const axios = require('axios').default;
const Config = require(assets["/Config.js"].path);

class WebhookService {
    sendInvalidMessage(message, phoneNumber) {
        const payload = {
            "message": message,
            "phoneNumber": phoneNumber,
            "type": "Invalid Message"
        };

        return this._send(payload);
    }

    _send(payload) {
        return axios.post(Config.WebhookUrl, payload);
    }
};

module.exports = WebhookService;
