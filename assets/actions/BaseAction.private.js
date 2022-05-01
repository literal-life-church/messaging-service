"use strict";

const assets = Runtime.getAssets();
const twilio = require("twilio");
const Config = require(assets["/Config.js"].path);
const PhoneRegistryModel = require(assets["/models/PhoneRegistryModel.js"].path);

class BaseAction {
    constructor(commandModel) {
        const client = twilio(Config.AccountSid, Config.AuthToken);

        this.phoneNumber = commandModel.phoneNumber
        this.message = commandModel.message
        this.notify = client.notify.services(Config.NotifyServiceSid);
    }

    _isPhoneNumberAlreadyRegistered() {
        return new Promise(async resolve => {
            let page = await this.notify.bindings.page({pageNumber: 0, pageSize: 50});

            while (true) {
                let bindings = page.instances;
                let didResolve = false;

                bindings.forEach(item => {
                    if (item.address === this.phoneNumber) {
                        resolve(new PhoneRegistryModel(
                            true, item.tags
                        ));

                        didResolve = true;
                    }
                });

                if (didResolve) return;
                page = await page.nextPage();

                if (page === undefined || page == null) {
                    break;
                }
            }

            resolve(new PhoneRegistryModel(
                false, []
            ));
        });
    }
}

module.exports = BaseAction;
