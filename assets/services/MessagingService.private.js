"use strict";

const assets = Runtime.getAssets();
const BroadcastAction = require(assets["/actions/BroadcastAction.js"].path);
const Config = require(assets["/Config.js"].path);
const InputCommandEnum = require(assets["/enums/InputCommandEnum.js"].path);
const InputParserService = require(assets["/services/InputParserService.js"].path);
const ResubscribeAction = require(assets["/actions/ResubscribeAction.js"].path);
const StatusAction = require(assets["/actions/StatusAction.js"].path);
const SubscribeAction = require(assets["/actions/SubscribeAction.js"].path);
const UnsubscribeAction = require(assets["/actions/UnsubscribeAction.js"].path);
const WebhookService = require(assets["/services/WebhookService.js"].path);

class MessagingService {
    run(event) {
        const parser = new InputParserService(event);
        const model = parser.commandInputModel;
        let response = null;

        switch (model.command) {
            case InputCommandEnum.BROADCAST_ANNOUNCEMENT_CALENDAR:
                const broadcast = new BroadcastAction(model);

                response = broadcast.run(
                    Config.AnnouncementCalendar.Broadcast.Success,
                    Config.AnnouncementCalendar.Broadcast.EmptyMessage,
                    Config.AnnouncementCalendar.Broadcast.Unauthorized,
                    Config.AnnouncementCalendar.Broadcast.AuthorizedPhoneNumbers,
                    Config.AnnouncementCalendar.BindingType,
                    Config.AnnouncementCalendar.Tags
                );

                break;
            
            case InputCommandEnum.HELP:
                const help = new StatusAction(model);

                response = help.run(
                    Config.Help.IsRegistered,
                    Config.Help.IsNotRegistered
                );

                break;

            case InputCommandEnum.RESUBSCRIBE:
                const resubscribe = new ResubscribeAction(model);

                response = resubscribe.run(
                    Config.Resubscribe.Message
                );

                break;

            case InputCommandEnum.STATUS:
                const status = new StatusAction(model);

                response = status.run(
                    Config.Status.IsRegistered,
                    Config.Status.IsNotRegistered
                );

                break;

            case InputCommandEnum.SUBSCRIBE_ANNOUNCEMENT_CALENDAR:
                const subscribe = new SubscribeAction(model);

                response = subscribe.run(
                    Config.AnnouncementCalendar.Subscribe.NewUser,
                    Config.AnnouncementCalendar.Subscribe.ExistingUser,
                    Config.AnnouncementCalendar.BindingType,
                    Config.AnnouncementCalendar.Tags
                );

                break;

            case InputCommandEnum.UNSUBSCRIBE:
                const unsubscribe = new UnsubscribeAction(model);
                response = unsubscribe.run();
                break;

            default:
                const webhook = new WebhookService();

                response = webhook
                    .sendInvalidMessage(model.message, model.phoneNumber)
                    .then(() => {
                        return Config.InvalidRequest;
                    });

                break;
        }

        return response;
    }
}

module.exports = MessagingService;
