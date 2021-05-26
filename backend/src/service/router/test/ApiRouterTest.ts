import { mockServer } from "./fakeApp";
const request = require("supertest");

describe("API Router", () => {

  let fakeApp;

  beforeAll(async () => {
    fakeApp = await mockServer();
  })

  test("GET /api/test should return 200", () => {
    return request(fakeApp)
      .get("/api/test")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("POST /api/test should return 200", () => {
    return request(fakeApp)
      .post("/api/test")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("PUT /api/test should return 200", () => {
    return request(fakeApp)
      .put("/api/test")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("DELETE /api/test should return 200", () => {
    return request(fakeApp)
      .delete("/api/test")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("GET /api/invalid should return 404", () => {
    return request(fakeApp)
      .get("/api/invalid")
      .then(response => {
        expect(response.statusCode).toBe(404);
      });
  });
});