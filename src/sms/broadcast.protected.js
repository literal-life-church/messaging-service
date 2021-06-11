"use strict";

const assets = Runtime.getAssets();
const Config = require(assets["/Config.js"].path);
const InputCommandEnum = require(assets["/enums/InputCommandEnum.js"].path);
const InputParserService = require(assets["/services/InputParserService.js"].path);
const SubscribeAction = require(assets["/actions/SubscribeAction.js"].path);

exports.handler = (context, event, callback) => {
    const twiml = new Twilio.twiml.MessagingResponse();
    twiml.message("Service is undergoing maintenance.");
    callback(null, twiml);

    let parser = new InputParserService(event);
    let model = parser.commandInputModel;

    let action = new SubscribeAction(model);

    switch (model.command) {
        case InputCommandEnum.SUBSCRIBE:
            action = new SubscribeAction(model);
    }

    action.run((response, error) => {
        const twiml = new Twilio.twiml.MessagingResponse();

        if (error) {
            console.log(error);
            response = Config.GenericErrorMessage;
        }

        twiml.message(response);
        callback(null, twiml);
    });
};
