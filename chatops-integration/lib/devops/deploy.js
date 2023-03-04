/*
 * Deployment module for ChatOps Integration
 */

// The deploy.js file exports a class Deployment which has a constructor that takes a deployment configuration object containing the target host, port, username, and password. The deploy method connects to the target host over SSH, updates the specified Docker service with the specified image, and logs the completion of the deployment.


const SSH2Promise = require('ssh2-promise');

class Deployment {
  constructor(config) {
    this.host = config.host;
    this.port = config.port;
    this.username = config.username;
    this.password = config.password;
  }

  async deploy(serviceName, imageName) {
    const ssh = new SSH2Promise({
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
    });

    await ssh.connect();
    await ssh.exec(`docker service update --image ${imageName} ${serviceName}`);
    ssh.close();
    console.log(`Deployment of ${serviceName} completed`);
  }
}

module.exports = Deployment;
