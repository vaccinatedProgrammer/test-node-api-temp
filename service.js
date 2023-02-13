/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const bunyanMiddleware = require('bunyan-middleware');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
/* graphql-start */
const { express: voyagerMiddleware } = require('graphql-voyager/middleware');
const startApolloServer = require('./infrastructure/utilities/graphql/start-apollo-server');
const schema = require('./src/schema');
const dataSources = require('./src/data-sources');
const {
  GRAPHQL_ENDPOINT_ROUTE,
  VOYAGER_ENDPOINT_ROUTE,
} = require('./default-env');
/* graphql-end */
const routes = require('./src/routes');
const healthCheck = require('./infrastructure/health-check');
const auth = require('./infrastructure/middleware/auth');

const createService = async () => {
  const app = express();
  const logger = require('./infrastructure/utilities/logger');

  const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true,
  };

  app.use(cors(corsOptions));

  app.use(
    bunyanMiddleware({
      headerName: 'X-Request-Id',
      propertyName: 'requestId',
      logName: `requestId`,
      obscureHeaders: ['authorization', 'cookie'],
      logger,
      filter: (req) => req.path === '/health',
    })
  );

  app.use(helmet.hidePoweredBy());
  app.use(helmet.noSniff());
  app.set('etag', false);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/health', healthCheck);

  auth(app);

  /* graphql-start */
  app.use(
    VOYAGER_ENDPOINT_ROUTE,
    voyagerMiddleware({
      endpointUrl: GRAPHQL_ENDPOINT_ROUTE,
    })
  );

  try {
    await startApolloServer({ app, schema, dataSources });
  } catch (error) {
    logger.error({ error }, 'Apollo server failed to start');
    throw new Error('Server failed to start: ', error);
  }
  /* graphql-end */

  app.use(routes);

  return app;
};

module.exports = createService;
