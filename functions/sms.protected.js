"use strict";

const assets = Runtime.getAssets();
const BroadcastAction = require(assets["/actions/BroadcastAction.js"].path);
const Config = require(assets["/Config.js"].path);
const InputCommandEnum = require(assets["/enums/InputCommandEnum.js"].path);
const InputParserService = require(assets["/services/InputParserService.js"].path);
const StatusAction = require(assets["/actions/StatusAction.js"].path);
const SubscribeAction = require(assets["/actions/SubscribeAction.js"].path);
const UnsubscribeAction = require(assets["/actions/UnsubscribeAction.js"].path);
const WebhookService = require(assets["/services/WebhookService.js"].path);

exports.handler = (context, event, callback) => {
    const parser = new InputParserService(event);
    const model = parser.commandInputModel;
    let outcome = null;

    switch (model.command) {
        case InputCommandEnum.BROADCAST_ANNOUNCEMENT_CALENDAR:
            const broadcast = new BroadcastAction(model);

            outcome = broadcast.run(
                Config.AnnouncementCalendar.Broadcast.Success,
                Config.AnnouncementCalendar.Broadcast.EmptyMessage,
                Config.AnnouncementCalendar.Broadcast.Unauthorized,
                Config.AnnouncementCalendar.Broadcast.AuthorizedPhoneNumbers,
                Config.AnnouncementCalendar.BindingType,
                Config.AnnouncementCalendar.Tags
            );

            break;
        
        case InputCommandEnum.STATUS:
            const status = new StatusAction(model);

            outcome = status.run(
                Config.Status.IsRegistered,
                Config.Status.IsNotRegistered
            );

            break;

        case InputCommandEnum.SUBSCRIBE_ANNOUNCEMENT_CALENDAR:
            const subscribe = new SubscribeAction(model);

            outcome = subscribe.run(
                Config.AnnouncementCalendar.Subscribe.NewUser,
                Config.AnnouncementCalendar.Subscribe.ExistingUser,
                Config.AnnouncementCalendar.BindingType,
                Config.AnnouncementCalendar.Tags
            );

            break;
        
        case InputCommandEnum.UNSUBSCRIBE:
            const unsubscribe = new UnsubscribeAction(model);
            outcome = unsubscribe.run();
            break;

        default:
            const webhook = new WebhookService();

            outcome = webhook
                .sendInvalidMessage(model.message, model.phoneNumber)
                .then(() => {
                    return Config.InvalidRequest;
                });

            break;
    }

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
