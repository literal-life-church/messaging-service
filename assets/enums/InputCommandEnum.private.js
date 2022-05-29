"use strict";

const InputCommandEnum = {
    NONE: 0,

    STATUS: 1,
    RESUBSCRIBE: 2,
    UNSUBSCRIBE: 3,

    BROADCAST_ANNOUNCEMENT_CALENDAR: 10,
    SUBSCRIBE_ANNOUNCEMENT_CALENDAR: 11
};

Object.freeze(InputCommandEnum);
module.exports = InputCommandEnum;
