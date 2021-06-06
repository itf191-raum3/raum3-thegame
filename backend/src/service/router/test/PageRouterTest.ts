import {mockServer} from "./fakeApp";

const request = require("supertest");

describe("Page Router", () => {

    let fakeApp;

    beforeAll(async () => {
        fakeApp = await mockServer();
    })

    test("GET /page/test should return 200", () => {
        return request(fakeApp)
            .get("/page/test")
            .then(response => {
                expect(response.statusCode).toBe(200);
            });
    });

    test("GET /page/invalid should return 404", () => {
        return request(fakeApp)
            .get("/page/invalid")
            .then(response => {
                expect(response.statusCode).toBe(404);
            });
    });
});