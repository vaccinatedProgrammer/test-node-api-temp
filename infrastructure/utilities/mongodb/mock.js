/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/**
 * Run a MongoDB Memory Server on the port specified in the env var.
 *
 */
const { MongoMemoryServer } = require('mongodb-memory-server');
const { MONGO_URI } = require('../../../default-env');

const {
  groups: { credentials, port, dbName },
} = /mongodb:\/\/(?:(?<credentials>[a-zA-Z0-9:]+)@)?(localhost|mongo):(?<port>[0-9]+)\/(?<dbName>[a-zA-Z0-9-]+)(?:\?authSource=(?<authSource>[a-zA-Z0-9]+))?/.exec(
  MONGO_URI
);

(async () => {
  console.log('Starting MongoDB Memory Server');

  await MongoMemoryServer.create({
    instance: {
      port: parseInt(port, 10) || 27017,
      dbName: dbName || 'loan-origination',
      auth: credentials,
    },
  });

  console.log(`MongoDB Memory Server started at port ${port}`);
})();
