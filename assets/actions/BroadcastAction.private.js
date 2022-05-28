"use strict";

const assets = Runtime.getAssets();
const BaseAction = require(assets["/actions/BaseAction.js"].path);

class BroadcastAction extends BaseAction {
    run(successMessage, emptyMessage, unauthorizedMessage, authorizedNumbers, bindingType, tags) {
        return new Promise(resolve => {
            let authorizedNumbersList = authorizedNumbers.split(",").map(number => {
                return number.trim();
            });

            if (authorizedNumbersList.includes(this.phoneNumber)) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
            .then(isAuthorized => {
                if (isAuthorized && !this._isBlank(this.message)) {
                    return this.notify.notifications.create({
                        bindingType: bindingType,
                        body: this.message,
                        tag: tags
                    });
                } else if (!isAuthorized) {
                    return "Unauthorized";
                } else if (this._isBlank(this.message)) {
                    return "Blank";
                } else {
                    throw "Unknown error";
                }
            })
            .then(response => {
                if (response == "Unauthorized") {
                    return unauthorizedMessage;
                } else if (response == "Blank") {
                    return emptyMessage;
                } else {
                    return successMessage;
                }
            });
    }

    _isBlank(input) {
        return !input || !input.trim();
    }
}

module.exports = BroadcastAction;
