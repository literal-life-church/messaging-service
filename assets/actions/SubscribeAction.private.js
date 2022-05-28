"use strict";

const assets = Runtime.getAssets();
const BaseAction = require(assets["/actions/BaseAction.js"].path);
const Crypto = require("crypto");

class SubscribeAction extends BaseAction {
    run(registrationSuccessMessage, alreadyRegisteredMessage, bindingType, tags) {
        return this._isPhoneNumberAlreadyRegistered()
            .then(registrationStatus => {
                if (registrationStatus.isRegistered) {
                    return null;
                }

                let identity = Crypto.randomBytes(16).toString("hex");

                return this.notify.bindings.create({
                    address: this.phoneNumber,
                    bindingType: bindingType,
                    identity: identity,
                    tag: tags
                });
            })
            .then(notification => {
                if (notification == null) {
                    return alreadyRegisteredMessage
                } else {
                    return registrationSuccessMessage;
                }
            });
    }
}

module.exports = SubscribeAction;
