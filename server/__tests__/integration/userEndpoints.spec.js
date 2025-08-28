const request = require("supertest");
const app = require("../../app");
const { resetTestDB, closeDB } = require("../../__tests__/integration/config");

beforeAll(async () => {
  await resetTestDB(); // reset DB before each test
});
afterAll(async () => {
  await closeDB(); // clean jest exit
});

describe("User integration", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/user/register").send({
      name: "Test User",
      email: "testuser@test.com",
      password: "password123",
      username: "testuser",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("userid");
    expect(res.body).toHaveProperty("email", "testuser@test.com");
  });

  it("should reject duplicate user registration", async () => {
    const res = await request(app).post("/user/register").send({
      name: "User 1",
      email: "user1@test.com",
      password: "password",
      username: "user1",
    });

    expect(res.status).toBe(400); 
    expect(res.body.error).toMatch(/already exists/i);
  });

  it("should fetch a user by id", async () => {
    const res = await request(app).get("/user/1");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("userid", 1);
    expect(res.body).toHaveProperty("email", "user1@test.com");
  });
});
