const request = require("supertest");
const { subject, fetchData, params, headers } = require("../app");
// moved to separate file to make more reusable
const countOccurences = require("./testHelpers/app.testHelpers");

describe("Testing the server", () => {
  describe("Testing routes", () => {
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

  describe("Testing the Get Request", () => {
    it("should return the same items of the same length as items passed in as params to the request", async () => {
      // Making sure response is ok
      const res = await request(subject).get("/handlebars");
      expect(res.status).toEqual(200);
      // mocking the fetch request
      const data = await fetchData(params, headers);
      // Hard coding 5 because the task asks us to input all 5 indeces to get the response
      expect(countOccurences(res)).toEqual(5);
      // If the length of the items property of the data object comes back as the same length of how many unordered lists there are in the text then we know that the length of the fetchData array parameter controls how many items we can get back from the API.
      expect(data.items.length).toEqual(countOccurences(res));
    });

    it("should return only as many items as there are valid indeces for", async () => {
      // setting the final param in the array to be incorrect
      params[params.length - 1] = "IB.1:IE";
      const res = await request(subject).get("/handlebars");
      const data = await fetchData(params, headers);
      console.log(data);
      // Hard coding 4 because only 4 of elements in the params are valid
      expect(countOccurences(res)).toEqual(4);
    });
  });
});
