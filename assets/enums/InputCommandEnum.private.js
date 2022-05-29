"use strict";

const InputCommandEnum = {
    NONE: 0,

    HELP: 1,
    STATUS: 2,
    RESUBSCRIBE: 3,
    UNSUBSCRIBE: 4,

    BROADCAST_ANNOUNCEMENT_CALENDAR: 10,
    SUBSCRIBE_ANNOUNCEMENT_CALENDAR: 11
};

Object.freeze(InputCommandEnum);
module.exports = InputCommandEnum;
