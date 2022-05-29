"use strict";

const assets = Runtime.getAssets();
const InputCommandEnum = require(assets["/enums/InputCommandEnum.js"].path);
const InputModel = require(assets["/models/InputModel.js"].path);

class InputParserService {
    constructor(event) {
        this.event = event;
    }

    get commandInputModel() {
        let phoneNumber = this._formattedPhoneNumber;
        let command = this._command;
        let message = this._message;

        return new InputModel(
            phoneNumber, command, message
        );
    }

    get _cleanUpInput() {
        let body = this.event.Body;

        if (body == undefined || body == null) {
            return ""
        }

        return body.trim();
    }

    get _command() {
        let inputWords = this._cleanUpInput.split(" ");

        if (inputWords.length === 0) {
            return InputCommandEnum.NONE;
        }

        let command = inputWords[0].toLowerCase().replace(/[^A-Za-z]/g, '');

        switch (command) {
            case "broadcast":
                return InputCommandEnum.BROADCAST_ANNOUNCEMENT_CALENDAR;
            
            case "help":
            case "info":
            case "information":
                return InputCommandEnum.HELP;

            case "start":
            case "unstop":
                return InputCommandEnum.RESUBSCRIBE;

            case "status":
                return InputCommandEnum.STATUS;

            case "subscribe":
            case "suscribe": // Common misspelling of "subscribe"
            case "subcribe": // Another one
                return InputCommandEnum.SUBSCRIBE_ANNOUNCEMENT_CALENDAR;

            case "cancel":
            case "stop":
            case "unsubscribe":
            case "unsuscribe": // Common misspelling of "unsubscribe"
            case "unsubcribe": // Another one
                return InputCommandEnum.UNSUBSCRIBE;

            default:
                return InputCommandEnum.NONE;
        }
    }

    get _formattedPhoneNumber() {
        let from = this.event.From;

        if (from == undefined || from == null) {
            return "";
        }

        if (from.trim().indexOf("+") !== 0) {
            return `+1${from.trim()}`;
        }

        return from.trim();
    }

    get _message() {
        let command = this._command;
        let inputWords = this._cleanUpInput.split(" ");

        // If there isn't a recognized command, include the whole message
        if (command === InputCommandEnum.NONE) {
            return inputWords.join(" ");
        }

        // May only include a command, with no text after
        if (inputWords.length <= 1) {
            return "";
        }

        return inputWords.slice(1).join(" ");
    }
}

module.exports = InputParserService;
