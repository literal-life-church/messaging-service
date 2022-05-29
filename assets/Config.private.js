"use strict";

const Config = {
    GenericErrorMessage: "There was a problem with your request. Please try again later.",
    InvalidRequest: "Thank you for messaging Literal Life Church. This phone number is unmonitored and does not accept generic messages or replies. If you have a question about this messaging service text the word HELP or send a message to one of our deacons or trustees.",
    WebhookUrl: process.env.WEBHOOK_URL,

    // region AuthN and Twilio Services

    AccountSid: process.env.ACCOUNT_SID,
    AuthToken: process.env.AUTH_TOKEN,
    NotifyServiceSid: process.env.NOTIFY_SERVICE_SID,

    // endregion

    AnnouncementCalendar: {
        BindingType: "sms",
        Tags: ["announcement", "calendar"],

        Broadcast: {
            AuthorizedPhoneNumbers: process.env.AUTHORIZED_BROADCAST_PHONE_NUMBERS,
            EmptyMessage: "Please specify a message as part of your broadcast command. Note that MMS messages are not supported. Here is an example of a valid command: broadcast There is no meetup tonight.",
            Success: "Your message will be delivered to all subscribed recipients within a few minutes.",
            Unauthorized: "You are not authorized to broadcast a message."
        },

        Subscribe: {
            ExistingUser: "You are already set to receive announcements and calendar events from Literal Life Church. If you need assistance, please respond with the word HELP for more information.",
            NewUser: "You are now subscribed to receive future announcements and calendar events from Literal Life Church. Unsubscribe anytime by replying STOP to no longer receive messages."
        }
    },

    Resubscribe: {
        Message: "You are currently set up to receive messages from Literal Life Church on the following channels: {tags}."
    },

    Status: {
        IsNotRegistered: "You are not set up to receive any messages from Literal Life Church. Reply with HELP for more info.",
        IsRegistered: "You are currently set up to receive messages from Literal Life Church on the following channels: {tags}. Reply with HELP for more info."
    }
};

Object.freeze(Config);
module.exports = Config;
