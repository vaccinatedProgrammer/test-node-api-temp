const cuid = require("cuid");

const context = ({ req }) => {
  const correlationId = cuid();
  const requestId = req.headers?.requestId || cuid();

  const meta = {
    correlationId,
    requestId,
  };

  return {
    meta,
  };
};

module.exports = context;
