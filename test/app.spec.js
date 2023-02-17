const request = require("supertest");
const subject = require("../app");

describe("Testing the server", () => {
  it("can run the express server and return a 200", async () => {
    const response = await request(subject).get("/");
    expect(response.statusCode).toBe(200);
  });
  // add your own tests here
  it("can run the express server and return a 404 for invalid url", async () => {
    const response = await request(subject).get("/invalid");
    expect(response.statusCode).toBe(404);
  });
});
