const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect(200)
      .expect("Content-Type", /json/);
  });
});

describe("Test POST /launches", () => {
  const completeLaunchData = {
    mission: "USS Enterprise",
    rocket: "NCC-1701-D",
    target: "Kepler-62 f",
    launchDate: "January 4, 2028",
  };
  const launchDataWithoutDate = {
    mission: "USS Enterprise",
    rocket: "NCC-1701-D",
    target: "Kepler-62 f",
  };

  test("It should respond with 201 success", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect(201)
      .expect("Content-Type", /json/);
    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });
  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate);
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });
  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send({
        ...launchDataWithoutDate,
        launchDate: "zoot",
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
