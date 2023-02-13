const mongoose = require('mongoose');
const logger = require('../logger');
const schemas = require('../../../src/database/schemas');

const models = {};

const initialiseMongoose = async ({ mongoDbUri }) => {
  const connect = async () => {
    try {
      await mongoose.connect(mongoDbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (error) {
      logger.error(
        { error },
        'There was a problem connecting to the Mongo server'
      );
      throw new Error('Mongoose connection error: ', error);
    }

    Object.entries(schemas).forEach(async ([modelName, schema]) => {
      try {
        models[modelName] = await mongoose.connection.model(modelName, schema);
        logger.info({ modelName }, 'Model instantiated');
      } catch (error) {
        logger.error(
          { error, modelName },
          'There was a problem instantiating the Mongoose model'
        );
        throw new Error('Mongoose model error: ', error);
      }
    });

    logger.info({}, 'Mongo connected successfully');

    mongoose.connection.on('disconnected', () => {
      logger.warn({}, 'Mongoose has disconnected');
    });

    mongoose.connection.on('error', (error) => {
      logger.error({ error }, 'MongoDB error');
    });

    mongoose.connection.on('reconnect', () => {
      logger.info({}, 'Mongoose has reconnected');
    });
  };

  const connecting = async () => {
    try {
      logger.info({}, 'Attempting to connect to MongoDB');
      await connect();
      return 0;
    } catch (error) {
      logger.error(
        { error: JSON.stringify(error) },
        'MongoDB connection error'
      );
    }

    return 1;
  };

  let result = await connecting();

  if (result === 0) return;

  let connectingInterval;
  await new Promise((resolve) => {
    connectingInterval = setInterval(async () => {
      logger.warn({}, 'Reconnecting to MongoDB');

      result = await connecting();
      if (result === 0) {
        clearInterval(connectingInterval);
        resolve();
      }
    }, 1000);
  });
};

module.exports = {
  initialiseMongoose,
  models,
};
