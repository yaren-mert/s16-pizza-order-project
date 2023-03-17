const Users = require("../api/users/users-model");
const db = require("../data/db-config");

describe("Sanity Test", () => {
  test("health", () => {
    expect(true).toBe(true);
  });
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

describe("getAll", () => {
  test("[1] tüm kullanıcılar geliyor", async () => {
    const users = await Users.getAll();
    expect(users).toHaveLength(2);
  });
});

describe("create", () => {
  test("[2] tüm kullanıcılar geliyor", async () => {
    const user = {
      name: "Emel Mert",
      email: "emel@wit.com.tr",
      password: "1234",
      role_id: 2,
    };
    const createdUser = await Users.create(user);
    expect(createdUser).not.toHaveProperty("password");
  });
  test("[3] tüm kullanıcılar geliyor", async () => {
    const user = {
      name: "Emel Mert",
      email: "emel@wit.com.tr",
      password: "1234",
      role_id: 2,
    };
    await Users.create(user);
    const users = await Users.getAll();
    expect(users).toHaveLength(3);
  });
});
