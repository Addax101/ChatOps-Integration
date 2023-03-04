/*
 * Docker integration module for ChatOps Integration
 */

// The docker.js file exports a class DockerIntegration which has a constructor that takes a Docker configuration object containing the Docker host, port, and authentication credentials. The buildImage method builds a Docker image using the specified Dockerfile path (dockerfilePath) and tag (imageName), streaming the build output to stdout.
const Docker = require('dockerode');

class DockerIntegration {
  constructor(config) {
    this.docker = new Docker(config);
  }

  buildImage(dockerfilePath, imageName, callback) {
    this.docker.buildImage({
      context: process.cwd(),
      src: [dockerfilePath],
      t: imageName,
    }, (err, stream) => {
      if (err) {
        console.error(`Error building Docker image: ${err}`);
      } else {
        stream.pipe(process.stdout);
        stream.on('end', () => {
          console.log(`Docker image ${imageName} built`);
          callback();
        });
      }
    });
  }
}

module.exports = DockerIntegration;
