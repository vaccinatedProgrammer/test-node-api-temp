const logger = require('../logger');

const loggerPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(requestContext) {
    logger.info(
      {
        meta: requestContext.context.meta,
      },
      'Request started'
    );

    return {
      async willSendResponse(context) {
        logger.info(
          {
            meta: context.context.meta,
          },
          'Sending Response'
        );
      },

      async didEncounterErrors(context) {
        logger.error(
          {
            meta: context.context.meta,
            errors: context.errors.map((error) => error.message),
          },
          'Encountered Errors'
        );
      },
    };
  },
};

module.exports = loggerPlugin;
