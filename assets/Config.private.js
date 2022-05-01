"use strict";

const Config = {
    GenericErrorMessage: "There was a problem with your request. Please try again later.",
    InvalidRequest: "Invalid request.",
    
    // region AuthN and Twilio Services
    
    AccountSid: "AC047e062c6321a40150ebf448d3ffc399",
    AuthToken: "c14c9d717d0893a093ed37a08f2e4834",
    NotifyServiceSid: "IS361d72ac8429bf7ec581f6c8359aa6e5",
    
    // endregion
    
    // region Announcement/Calendar Channel

    AnnouncementCalendar: {
        ExistingUserMessage: "You are already set to receive announcements and calendar events from Literal Life Church. If you need assistance, please respond with the word HELP for more information.",
        Tags: ["announcement", "calendar"],
        WelcomeMessage: "You are now subscribed to receive future announcements and calendar events from Literal Life Church. Unsubscribe anytime by replying STOP to no longer receive messages."
    }

    // endregion
};

Object.freeze(Config);
module.exports = Config;
