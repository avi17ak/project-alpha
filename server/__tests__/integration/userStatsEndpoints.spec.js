const request = require("supertest");
const app = require("../../app");
const { resetTestDB, closeDB } = require("./config");

beforeEach(async () => {
  await resetTestDB(); // Reset DB before each test
});

afterAll(async () => {
  await closeDB(); // clean jest exit
});

describe("UserStats integration", () => {
  it("should create new userstats", async () => {
    const res = await request(app).post("/userstats").send({
      username: "newuser",
      userid: 4,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("userstatsid");
    expect(res.body).toHaveProperty("username", "newuser");
    expect(res.body).toHaveProperty("overallpercentage", 0);
  });

  it("should reject duplicate userstats creation", async () => {
    const res = await request(app).post("/userstats").send({
      username: "user1",
      userid: 1,
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/already exists/i);
  });

  it("should fetch userstats by username", async () => {
    const res = await request(app).get("/userstats/user1");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("username", "user1");
    expect(res.body).toHaveProperty("overallpercentage", 50);
    // convert string to number if necessary
    expect(Number(res.body.overallpercentage)).toBe(50);
  });

  it("should update userstats", async () => {
    const res = await request(app).patch("/userstats/user1").send({
      overallpercentage: 60,
      geographycorrect: 1,
      musiccorrect: 0,
      historycorrect: 1,
      spanishcorrect: 0,
      totalquizzes: 1,
      totaltime: 120,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("username", "user1");
    expect(res.body).toHaveProperty("overallpercentage", 60);
    expect(res.body).toHaveProperty("geographycorrect", 2); // 1 + 1
    expect(res.body).toHaveProperty("historycorrect", 2); // 1 + 1
    expect(res.body).toHaveProperty("totalquizzes", 6); // 5 + 1
    expect(res.body).toHaveProperty("totaltime", 420); // 300 + 120
  });

  it("should return 404 for non-existing userstats", async () => {
    const res = await request(app).get("/userstats/nonexistentuser");
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/Unable to retrieve userstats/i);
  });
});
