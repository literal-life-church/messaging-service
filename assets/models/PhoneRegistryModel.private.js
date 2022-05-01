"use strict";

class PhoneRegistryModel {
    constructor(isRegistered, tags) {
        this.commaSeparatedTags = tags.join(", ");
        this.isRegistered = isRegistered;
        this.tags = tags;
    }
}

module.exports = PhoneRegistryModel;
