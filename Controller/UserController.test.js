// process.env.NODE_ENV = "test";
const User = require("../Model/User");
const supertest = require("supertest");

const app = require("../app");
const request = supertest(app);
const { connect, close } = require("../db");

describe("User", () => {
  beforeAll(() => {
    connect().catch((err) => console.log(err));
  });

  afterAll(() => {
    close().catch((err) => console.log(err));
  });

  test("addUser", async () => {
    await User.deleteMany({});

    const body = {
      username: "1",
      password: "1",
      _id: "111111111111111111111111",
    };
    const res = await request.post("/addUser").send(body);

    expect(res.statusCode).toBe(200);
  });

  test("login", async () => {
    const body = {
      username: "1",
      password: "1",
    };

    const res = await request.post("/login").send(body);

    expect(res.statusCode).toBe(200);
  });

  test("getUserByUserName", async () => {
    const body = {
      username: "1",
    };

    const res = await request.post("/getUserByUserName").send(body);

    expect(res.statusCode).toBe(200);
  });
});
