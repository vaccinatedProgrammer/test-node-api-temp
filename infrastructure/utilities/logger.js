const bunyan = require('bunyan');
const { name, version } = require('../../package.json');

const logger = bunyan.createLogger({
  name: `${name}-v${version}-service-logs`,
  streams: [
    {
      level: 'info',
      stream: process.stdout,
    },
    {
      level: 'warn',
      stream: process.stderr,
    },
    {
      level: 'error',
      stream: process.stderr,
    },
  ],
});

module.exports = logger;
