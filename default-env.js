const { cleanEnv, str, num, bool } = require('envalid');

const env = cleanEnv(process.env, {
  PORT: num({ default: 3001 }),
  ENVIRONMENT: str({ default: 'test' }),
  OBSERVATION_TOPIC_NAME: str({
    default: '__NAME__-events',
  }),
  SHOULD_RAISE_EVENTS: bool({ default: false }),
  MOCK_SERVER_URI: str({ default: 'http://localhost:3006' }),
  /* mongo-start */
  MONGO_URI: str({
    default: 'mongodb://localhost:27017/__NAME__',
  }),
  /* mongo-end */
  /* graphql-start */
  GRAPHQL_ENDPOINT_ROUTE: str({ default: '/graphql' }),
  VOYAGER_ENDPOINT_ROUTE: str({ default: '/voyager' }),
  /* graphql-end */
});

module.exports = env;
