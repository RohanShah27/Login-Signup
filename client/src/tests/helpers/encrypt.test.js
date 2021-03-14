import encrypt from "../../helpers/encrypt";
describe("Test suite for encrypt helper", () => {
  it("should test for successfull encryption", async () => {
    const data = {
      userName: "value",
    };
    const result = await encrypt(data);
    expect(result.error).toBe(false);
    expect(result.encryptedData).toContain("U2FsdGVkX1");
  });
  it("should test for unsuccessfull encryption", async () => {
    const data = null;
    const result = await encrypt(data);
    expect(result.error).toBe(true);
  });
});
