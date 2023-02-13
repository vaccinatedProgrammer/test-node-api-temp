/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const { performance, PerformanceObserver } = require('perf_hooks');
const logger = require('./utilities/logger');

const perfObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    logger.info(
      { systemMetric: true, details: entry, type: 'PERFORMANCE' },
      'Duration'
    );
  });
});

perfObserver.observe({ entryTypes: ['measure'], buffer: true });

const handleRequest = async (req, res) => {
  try {
    performance.mark('request-process-start');
    req.log.info(
      {
        systemMetric: true,
        type: 'MONITORING',
      },
      'New request received'
    );

    const executeLogic = require(`../src/routes${req.url}/logic.js`);

    const result = await executeLogic(req, {
      requestId: req.requestId || 'unknown',
      correlationId: 'unknown',
    });

    req.log.info({ requestId: req.requestId }, 'Finished processing request');
    return res.status(200).send(result);
  } catch (error) {
    req.log.error(
      {
        correlationId: 'unknown',
        details: error.response ? error.response.data : error.message,
        systemMetric: true,
        type: 'ERROR',
      },
      'Failed to process request'
    );
    return res.status(500).send({ error: 'Failed to process request' });
  } finally {
    performance.mark('request-process-end');
    performance.measure(
      'request-process-duration',
      'request-process-start',
      'request-process-end'
    );
  }
};

module.exports = handleRequest;
