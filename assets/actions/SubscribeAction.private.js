"use strict";

const assets = Runtime.getAssets();
const BaseAction = require(assets["/actions/BaseAction.js"].path);

class SubscribeAction extends BaseAction {
    run(callback) {
        this._isPhoneNumberAlreadyRegistered()
            .then(isRegistered => {
                let x = 42;
                let y = isRegistered;
            });
    }
}

module.exports = SubscribeAction;
