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

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMTExMTExMTExMTExMTExMTExMTExMSIsImlhdCI6MTY4MjU1NDAxMn0.yBVt61amSiBowhmqg-TaCvJIXK_F3vDNtSZr4Efa2hI";

  test("isTokenValid", async () => {
    const res = await request.get("/isTokenValid").set({
      "x-access-token": token,
    });

    expect(res.statusCode).toBe(200);
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

  test("getUserByID", async () => {
    const res = await request.get("/getUserByID").set({
      "x-access-token": token,
    });

    expect(res.statusCode).toBe(200);
  });

  test("getUsername", async () => {
    const res = await request.get("/getUsername").set({
      "x-access-token": token,
    });

    expect(res.statusCode).toBe(200);
  });
});
