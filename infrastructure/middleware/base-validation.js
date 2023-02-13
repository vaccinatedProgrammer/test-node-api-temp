/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const baseValidation = async (req, res, next) => {
  let requestValidationPath;
  let requestHandlerPath;
  try {
    requestHandlerPath = require(`../../src/routes${req.url}/logic.js`);
    requestValidationPath = require(`../../src/routes${req.url}/validation.js`);
  } catch (err) {
    req.log.debug(err);
  }

  if (!requestHandlerPath)
    return res.status(404).send({ error: "Unknown route" });

  const isValid = requestValidationPath && requestValidationPath(req);
  if (isValid && isValid.error) {
    req.log.warn({ error: isValid.error });
    return res.status(400).send({ error: "Invalid request" });
  }
  return next();
};

module.exports = baseValidation;
