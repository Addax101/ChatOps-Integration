/*
 * Notification module for ChatOps Integration
 */

const axios = require('axios');

class Notification {
  constructor(config) {
    this.url = config.url;
  }

  async sendNotification(message) {
    const payload = {
      text: message,
    };

    try {
      await axios.post(this.url, payload);
      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  }
}

module.exports = Notification;
