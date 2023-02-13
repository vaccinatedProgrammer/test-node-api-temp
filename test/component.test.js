const request = require("supertest");
const express = require("express");
const dyson = require("dyson");
const path = require("path");
require("dotenv").config({ path: "./test.env" });
/* graphql-start */
const {
  GRAPHQL_ENDPOINT_ROUTE,
  VOYAGER_ENDPOINT_ROUTE,
} = require("../default-env");
/* graphql-end */
const createService = require("../service");

let service;
let dysonServer;

describe("component tests", () => {
  beforeAll(async () => {
    const options = {
      configDir: path.join(__dirname, "../mocks/externals"),
    };
    const dysonApp = express();
    const configs = dyson.getConfigurations(options);
    dyson.registerServices(dysonApp, options, configs);
    dysonServer = dysonApp.listen(3006);

    /* eslint-disable no-console */
    console.log(`Dyson listening at port 3006`);

    service = await createService();
  });

  afterAll(async () => {
    dysonServer.close();
  });

  test("it returns a 200 status code when a health request is received", async () => {
    const actualResponse = await request(service).get("/health");

    expect(actualResponse.status).toBe(200);
  });

  test("it returns a 404 status code when a request is received on an unknown route", async () => {
    const actualResponse = await request(service).post("/unknown").send({});

    expect(actualResponse.status).toBe(404);
  });

  /* graphql-start */
  test("it returns a 200 status code from a GET to the graphql endpoint", async () => {
    const actualResponse = await request(service)
      .get(GRAPHQL_ENDPOINT_ROUTE)
      .set(
        "Accept",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
      )
      .send({});

    expect(actualResponse.status).toBe(200);
  });

  test("it returns a 200 status code from a GET to the voyager endpoint", async () => {
    const actualResponse = await request(service).get(VOYAGER_ENDPOINT_ROUTE);

    expect(actualResponse.status).toBe(200);
  });

  test("it returns a 200 status code when a findManyExample query is processed", async () => {
    const actualResponse = await request(service)
      .post(GRAPHQL_ENDPOINT_ROUTE)
      .set("Content-Type", "application/json")
      .send(
        JSON.stringify({
          query: `query FindManyExample($exampleString: String!) {
            findManyExample(exampleString: $exampleString) {
              id
              exampleString
            }
          }`,
          variables: {
            exampleString: "hello",
          },
        })
      );

    expect(actualResponse.status).toBe(200);
  });

  test("it returns a 200 status code when an updateExample mutation is processed", async () => {
    const actualResponse = await request(service)
      .post(GRAPHQL_ENDPOINT_ROUTE)
      .set("Content-Type", "application/json")
      .send(
        JSON.stringify({
          query: `mutation UpdateExample($exampleString: String!) {
            updateExample(exampleString: $exampleString) {
              id
              exampleString
            }
          }`,
          variables: {
            exampleString: "hello",
          },
        })
      );

    expect(actualResponse.status).toBe(200);
  });

  test("it returns a 400 status code when a nonexistant query is processed", async () => {
    const actualResponse = await request(service)
      .post(GRAPHQL_ENDPOINT_ROUTE)
      .set("Content-Type", "application/json")
      .send(
        JSON.stringify({
          query: `query NonExistantQuery($exampleString: String!) {
            nonExistantQuery(exampleString: $exampleString) {
              id
              exampleString
            }
          }`,
          variables: {
            exampleString: "hello",
          },
        })
      );

    expect(actualResponse.status).toBe(400);
  });

  test("it returns a 400 status code when a nonexistant mutation is processed", async () => {
    const actualResponse = await request(service)
      .post(GRAPHQL_ENDPOINT_ROUTE)
      .set("Content-Type", "application/json")
      .send(
        JSON.stringify({
          query: `mutation NonExistantMutation($exampleString: String!) {
            nonExistantMutation(exampleString: $exampleString) {
              id
              exampleString
            }
          }`,
          variables: {
            exampleString: "hello",
          },
        })
      );

    expect(actualResponse.status).toBe(400);
  });
  /* graphql-end */
});
