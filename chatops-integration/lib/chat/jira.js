/*
 * Jira integration module for ChatOps Integration
 */

// The jira.js file exports a class JiraIntegration which has a constructor that takes a Jira configuration object. The createIssue method creates a new issue in a specified Jira project using the Jira REST API

const JiraApi = require('jira-client');

class JiraIntegration {
  constructor(config) {
    this.jira = new JiraApi(config);
  }

  createIssue(summary, description, projectKey, issueType) {
    const issue = {
      fields: {
        project: {
          key: projectKey,
        },
        summary: summary,
        description: description,
        issuetype: {
          name: issueType,
        },
      },
    };

    this.jira.issue.createIssue(issue, (err, issue) => {
      if (err) {
        console.error(`Error creating Jira issue: ${err}`);
      } else {
        console.log(`Jira issue ${issue.key} created`);
      }
    });
  }
}

module.exports = JiraIntegration;
