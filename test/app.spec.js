const request = require("supertest");
const { subject, fetchData, filterItems, params, headers } = require("../app");
// moved to separate file to make more reusable
const countOccurences = require("./testHelpers/app.testHelpers");
// bringing in the fixture
const fixture = require("./fixtures/securities-response.json");

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
      // Hard coding 5 because the task asks us to input all 5 indeces to get the response shown.
      expect(countOccurences(res)).toEqual(5);
      // If the length of the items property of the data object comes back as the same length of how many unordered lists there are in the text then we know that the length of the fetchData array parameter controls how many items we can get back from the API.
      expect(data.items.length).toEqual(countOccurences(res));
    });

    it("should return only as many items as there are valid indeces for", async () => {
      // setting the final param in the array to be incorrect
      const newParams = [...params];
      newParams[params.length - 1] = "IB.1:IE";
      const res = await fetchData(newParams, headers);
      // Hard coding 4 because only 4 of elements in the params are valid so once the filtering has happened there should only be 4 items returned out of the response that are set as data.
      expect(filterItems(res).length).toBe(4);
    });

    it("the returned response data should contain all the relavant data that is expected", async () => {
      const res = await request(subject).get("/handlebars");
      expect(res.status).toEqual(200);
      const response = await fetchData(params, headers);
      const data = filterItems(response);
      // Making sure that in the correct version of the code that there are 5 returned values for the items.
      expect(data.length).toBe(5);
      // Making sure that on an example item from the expected data json format has the same properties as the response from my get request
      expect(Object.keys(data[0])).toEqual(Object.keys(fixture.data.items[0]));
    });
  });
});
