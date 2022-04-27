"use strict";

const assets = Runtime.getAssets();
const InputParserService = require(assets["/InputParserService.js"].path);

exports.handler = function(context, event, callback) {
  let parser = new InputParserService(event);
  let model = parser.commandInputModel;

  const twiml = new Twilio.twiml.MessagingResponse();
  twiml.message("Broadcast service is undergoing maintenance.");
  callback(null, twiml);
};
