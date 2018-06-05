/**
 * The Bot Itself
 */
"use strict";
const path = require("path");
const Bot = require('@menome/botframework');
const config = require("../config/config.json");
const configSchema = require("./config-schema");
const crawler = require("./crawler");

// Start the actual bot here.
var bot = new Bot({
  config: {
    "name": "WebDAV Crawler",
    "desc": "Crawls WebDAV Fileshares",
    ...config
  },
  configSchema
});

// Let our middleware use these.
bot.web.use((req,res,next) => {
  req.crawler = new crawler(bot);
  next();
});

// Set up our security middleware.
bot.registerControllers(path.join(__dirname+"/controllers"));

bot.start();
bot.changeState({state: "idle"});