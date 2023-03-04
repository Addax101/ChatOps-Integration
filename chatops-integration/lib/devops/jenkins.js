/*
 * Jenkins integration module for ChatOps Integration
 */

// The jenkins.js file exports a class JenkinsIntegration which has a constructor that takes a Jenkins configuration object containing the Jenkins URL, username, and password. The triggerBuild method triggers a build for a specified Jenkins job with the specified parameters using the Jenkins REST API.

const request = require('request');

class JenkinsIntegration {
  constructor(config) {
    this.jenkinsUrl = config.jenkinsUrl;
    this.username = config.username;
    this.password = config.password;
  }

  triggerBuild(jobName, parameters) {
    const options = {
      url: `${this.jenkinsUrl}/job/${jobName}/buildWithParameters`,
      method: 'POST',
      auth: {
        user: this.username,
        pass: this.password,
      },
      qs: parameters,
    };

    request(options, (err, response) => {
      if (err) {
        console.error(`Error triggering Jenkins build: ${err}`);
      } else {
        console.log(`Jenkins build triggered for job ${jobName}: ${response.statusCode}`);
      }
    });
  }
}

module.exports = JenkinsIntegration;
