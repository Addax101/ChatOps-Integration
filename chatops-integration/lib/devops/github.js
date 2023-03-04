/*
 * GitHub integration module for ChatOps Integration
 */

// The github.js file exports a class GitHubIntegration which has a constructor that takes a GitHub configuration object containing the GitHub API token. The createPullRequest method creates a pull request on a specified GitHub repository to merge the specified branch (head) into the specified base branch (base) with a specified title.

const GitHubApi = require('github');

class GitHubIntegration {
  constructor(config) {
    this.github = new GitHubApi({
      version: '3.0.0',
      protocol: 'https',
      host: 'api.github.com',
      headers: {
        'user-agent': 'ChatOps Integration',
      },
      timeout: 5000,
      followRedirects: false,
    });

    this.github.authenticate({
      type: 'oauth',
      token: config.githubToken,
    });
  }

  createPullRequest(title, base, head) {
    const options = {
      owner: base.split(':')[0],
      repo: base.split(':')[1],
      title: title,
      head: head,
      base: base,
      body: `Automatically created pull request for merging ${head} into ${base}`,
    };

    this.github.pullRequests.create(options, (err, res) => {
      if (err) {
        console.error(`Error creating GitHub pull request: ${err}`);
      } else {
        console.log(`GitHub pull request created: ${res.html_url}`);
      }
    });
  }
}

module.exports = GitHubIntegration;
