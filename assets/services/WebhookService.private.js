"use strict";

const assets = Runtime.getAssets();
const axios = require('axios').default;
const Config = require(assets["/Config.js"].path);
const InvalidMessageWebhookModel = require(assets["/models/InvalidMessageWebhookModel.js"].path);
const NewSubscriberWebhookModel = require(assets["/models/NewSubscriberWebhookModel.js"].path);
const UnsubscribeWebhookModel = require(assets["/models/UnsubscribeWebhookModel.js"].path);

class WebhookService {
    sendInvalidMessage(message, phoneNumber) {
        const payload = new InvalidMessageWebhookModel(
            message, phoneNumber, "Invalid Message"
        );

        return this._send(payload.toJson());
    }

    sendNewSubscriber(phoneNumber, tags) {
        const payload = new NewSubscriberWebhookModel(
            phoneNumber, tags, "New Subscriber"
        );

        return this._send(payload.toJson());
    }

    sendUnsubscribe(phoneNumber) {
        const payload = new UnsubscribeWebhookModel(
            phoneNumber, "Unsubscribe"
        );

        return this._send(payload.toJson());
    }

    _send(payload) {
        return axios.post(Config.WebhookUrl, payload);
    }
};

module.exports = WebhookService;
