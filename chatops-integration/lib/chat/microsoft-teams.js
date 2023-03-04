/*
 * Microsoft Teams integration module for ChatOps Integration
 */

// The microsoft-teams.js file exports a class MicrosoftTeamsIntegration which has a constructor that takes a webhook URL for the Microsoft Teams integration. The sendMessage method sends a message to a specified Microsoft Teams channel using the webhook URL and a JSON payload.


const request = require('request');

class MicrosoftTeamsIntegration {
  constructor(webhookUrl) {
    this.webhookUrl = webhookUrl;
  }

  sendMessage(channel, message) {
    const payload = {
      text: message,
      summary: message,
    };

    request.post({
      url: this.webhookUrl,
      json: true,
      body: payload,
    }, (err, response) => {
      if (err) {
        console.error(`Error sending message to Microsoft Teams: ${err}`);
      } else {
        console.log(`Message sent to Microsoft Teams channel ${channel}: ${response}`);
      }
    });
  }
}

module.exports = MicrosoftTeamsIntegration;
