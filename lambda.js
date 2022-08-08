"use strict";
const warmer = require("lambda-warmer");

const app = require("./app");

exports.handler = (event, context) => {
  // Start a promise chain
  warmer(event).then((isWarmer) => {
    // If a warming event
    if (isWarmer) return "warmed";

    // Proceed with handler logic
    app();
  });
};
