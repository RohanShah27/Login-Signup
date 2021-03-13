const { expectCt } = require("helmet");
const request = require("supertest");
const app = require("../../../index");
describe("Test suite for User services apis", () => {
  // POSITIVE TEST CASE
  it("should test for sign up api to send positive response", (done) => {
    let requestBody = {
      emailId: "test@gmail.com",
      password: "somepassword",
    };
    requestBody = JSON.stringify(requestBody);
    request(app)
      .post("/api/user-services/sign-up")
      .send(requestBody)
      .set("Content-type", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        done();
      });
  });
  // NEGATIVE TEST CASES
  it("should test for sign up api to send negative response when request is malformed", (done) => {
    let requestBody = {
      emailId: "test@gmail.com",
    };
    requestBody = JSON.stringify(requestBody);
    request(app)
      .post("/api/user-services/sign-up")
      .send(requestBody)
      .set("Content-type", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Malformed Request");
        done();
      });
  });
  it("should test for sign up api to send negative response when request is malformed", (done) => {
    let requestBody = {
      password: "password",
    };
    requestBody = JSON.stringify(requestBody);
    request(app)
      .post("/api/user-services/sign-up")
      .send(requestBody)
      .set("Content-type", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Malformed Request");
        done();
      });
  });
});
