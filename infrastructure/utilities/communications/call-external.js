const axios = require('axios');
const logger = require('../logger');

module.exports = async (url, method, headers = {}, request = null) => {
  try {
    const { requestId } = headers;

    logger.info({ url, requestId }, 'Starting external call');
    const response = await axios({
      method,
      url: `${url}`,
      data: request,
      headers,
    });

    if (!response || !response.data) {
      logger.error({ requestId }, 'No response returned from service');
      throw new Error('No response returned from service');
    }
    return response.data;
  } catch (error) {
    logger.error(
      {
        response: error.response ? error.response.data : error.message,
        url,
        headers,
      },
      'Error returned from external service'
    );
    throw new Error('Error returned from external service');
  } finally {
    logger.info(
      { url, requestId: headers.requestId },
      'Finished external call'
    );
  }
};
