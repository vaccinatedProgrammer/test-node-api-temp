/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
require("dotenv").config();
const { name, version } = require("./package.json");

const env = require("./default-env");

const createService = require("./service");
const logger = require("./infrastructure/utilities/logger");
/* mongo-start */
const { initialiseMongoose } = require("./infrastructure/utilities/mongodb");
const { MONGO_URI } = require("./default-env");
/* mongo-end */

const port = env.PORT;

(async () => {
  /* mongo-start */
  initialiseMongoose({ mongoDbUri: MONGO_URI });
  /* mongo-end */

  const service = await createService();

  service.listen(port, () => {
    logger.info(`${name} v${version} listening at http://localhost:${port}`);
  });
})();
