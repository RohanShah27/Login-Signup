const { expectCt } = require("helmet");
const request = require("supertest");
const app = require("../../../index");
const { encrypt } = require("../../middlewares/encrypt-decrypt");
describe("Test suite for User services apis", () => {
  // POSITIVE TEST CASE
  it("should test for sign up api to send positive response", async (done) => {
    let requestBody = {
      emailId: "test@gmail.com",
      password: "somepassword",
      mobileNumber: "1234567890",
      userName: "Test user",
    };
    requestBody = JSON.stringify(requestBody);
    let payload = encrypt(requestBody);
    request(app)
      .post("/api/user-services/sign-up")
      .send({ encryptedData: payload })
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
    let payload = encrypt(requestBody);
    request(app)
      .post("/api/user-services/sign-up")
      .send({ encryptedData: payload })
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
    let payload = encrypt(requestBody);
    request(app)
      .post("/api/user-services/sign-up")
      .send({ encryptedData: payload })
      .set("Content-type", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Malformed Request");
        done();
      });
  });
  it("should test for sign up api to send negative response when request is malformed for Man in middle attack", (done) => {
    let requestBody = {
      password: "password",
    };
    requestBody = JSON.stringify(requestBody);
    let payload = encrypt(requestBody);
    request(app)
      .post("/api/user-services/sign-up")
      .send({ payload })
      .set("Content-type", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Key possibly incorrect");
        done();
      });
  });
});
