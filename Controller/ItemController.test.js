const Item = require("../Model/Item");
const supertest = require("supertest");

const app = require("../app");
const request = supertest(app);
const { connect, close } = require("../db");

describe("Item", () => {
  beforeAll(() => {
    connect().catch((err) => console.log(err));
  });

  afterAll(() => {
    close().catch((err) => console.log(err));
  });

  test("addItem", async () => {
    await Item.deleteMany({});

    const body = {
      title: "1",
      content: "1",
      creatorRef: "111111111111111111111111",
      _id: "222222222222222222222222",
    };

    const res = await request.post("/addTask").send(body);

    expect(res.statusCode).toBe(200);
  });

  test("edit", async () => {
    const body = {
      updateFields: {
        title: "2",
        content: "2",
      },
      id: "222222222222222222222222",
    };

    const res = await request.post("/editTask").send(body);

    expect(res.statusCode).toBe(200);
  });

  test("getAll", async () => {
    const res = await request.post("/getAllTasks").send({});

    expect(res.statusCode).toBe(200);
  });

  test("getAllForUser", async () => {
    const body = {
      creatorRef: "111111111111111111111111",
    };

    const res = await request.post("/getAllForUser").send(body);

    expect(res.statusCode).toBe(200);
  });

  test("delete", async () => {
    const body = {
      id: "222222222222222222222222",
    };

    const res = await request.post("/deleteTask").send(body);

    expect(res.statusCode).toBe(200);
  });
});
