/*
 * Slack integration module for ChatOps Integration
 */

// The slack.js file exports a class SlackIntegration which has a constructor that takes an API token for the Slack integration. The sendMessage method sends a message to a specified Slack channel using the chat.postMessage API method.

const Slack = require('slack-node');

class SlackIntegration {
  constructor(apiToken) {
    this.slack = new Slack(apiToken);
  }

  sendMessage(channel, message) {
    this.slack.api('chat.postMessage', {
      channel: channel,
      text: message,
    }, (err, response) => {
      if (err) {
        console.error(`Error sending message to Slack: ${err}`);
      } else {
        console.log(`Message sent to Slack channel ${channel}: ${response}`);
      }
    });
  }
}

module.exports = SlackIntegration;
