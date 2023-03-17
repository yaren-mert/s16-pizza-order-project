const request = require("supertest");
const server = require("../api/server");
const db = require("../data/db-config");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("Sanity Test", () => {
  test("Doğru environment üzerinde test yapılıyor", () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
});

describe("API TESTS", () => {
  beforeEach(async () => {
    await request(server).post("/api/auth/register").send({
      name: "Emel Mert",
      email: "emel@wit.com.tr",
      password: "1234",
      role_id: 2,
    });
  });
  test("[1] login ile token dönüyor", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ email: "emel@wit.com.tr", password: "1234" });
    expect(res.body).toHaveProperty("token");
  });
});
