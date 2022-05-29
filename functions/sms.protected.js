"use strict";

const assets = Runtime.getAssets();
const Config = require(assets["/Config.js"].path);
const MessagingService = require(assets["/services/MessagingService.js"].path);

exports.handler = (context, event, callback) => {
    const messaging = new MessagingService();
    const outcome = messaging.run(event);

    outcome
        .then(message => {
            const twiml = new Twilio.twiml.MessagingResponse();
            if (message != null) twiml.message(message);
            callback(null, twiml);
        })
        .catch(error => {
            const twiml = new Twilio.twiml.MessagingResponse();
            console.log(error);

            twiml.message(Config.GenericErrorMessage);
            callback(null, twiml);
        });
};
