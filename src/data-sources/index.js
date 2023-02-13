/* eslint-disable */

const { RESTDataSource } = require('apollo-datasource-rest');

class ExampleApi extends RESTDataSource {
  constructor() {
    super();

    // set baseURL here for requests to this datasource
    // this.baseURL = 'http://example-rest-api.com';
  }

  async getExample({ exampleString = 'example' }) {
    // return this.post('/example', exampleString);

    return [
      {
        id: 1,
        exampleString
      },
      {
        id: 2,
        exampleString: `${exampleString.toUpperCase()}`
      }
    ];
  }
}

module.exports = () => ({
  example: new ExampleApi(),
});
