const routes = require("../ApiRoutes");
const App = require("../../../service/App");
const request = require("supertest");

describe("Test API Routes", () => {
  test("Test route should respond with Hello world JSON object", () => {
    return request(App)
      .get("/api/test")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe({
          message: "Hello World!"
        });
      });
  });
})