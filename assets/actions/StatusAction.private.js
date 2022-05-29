"use strict";

const assets = Runtime.getAssets();
const BaseAction = require(assets["/actions/BaseAction.js"].path);

class StatusAction extends BaseAction {
    run(isRegisteredMessage, isNotRegisteredMessage) {
        return this._isPhoneNumberAlreadyRegistered()
            .then(registrationStatus => {
                if (registrationStatus.isRegistered) {
                    let finalMessage = isRegisteredMessage.replace("{tags}", registrationStatus.commaSeparatedTags);
                    return finalMessage;
                } else {
                    return isNotRegisteredMessage;
                }
            });
    }
}

module.exports = StatusAction;
