"use strict";

const InputCommandEnum = {
    NONE: 0,
    HELP: 1,

    BROADCAST_ANNOUNCEMENT_CALENDAR: 2,
    SUBSCRIBE_ANNOUNCEMENT_CALENDAR: 3
};

Object.freeze(InputCommandEnum);
module.exports = InputCommandEnum;
