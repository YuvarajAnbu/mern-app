const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server/app");

const id = "641e73f60952aeccb3843ce8";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWU3MzcyMDk1MmFlY2NiMzg0M2NjOSIsImlhdCI6MTY3OTcxNzIzNX0.Ihlc225sjHXTMeCI5E0k6esxCvLGlZ_0vSEHitBDmB0";

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /api/products", () => {
  test("should return all products", async () => {
    const res = await request(app)
      .get("/api/products")
      .set({ Authorization: `Bearer ${token}` });
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /api/products/:id", () => {
  test("should return a product", async () => {
    const res = await request(app)
      .get(`/api/products/${id}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res.statusCode).toBe(200);
  });
});

describe("POST /api/products", () => {
  test("should create a product", async () => {
    const res = await request(app)
      .post("/api/products")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        name: "Product 2",
        price: 1009,
        description: "Description 2",
      });

    expect(res.statusCode).toBe(201);
  });
});

describe("PUT /api/products/:id", () => {
  test("should update a product", async () => {
    const res = await request(app)
      .put(`/api/products/${id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({
        name: "Product 4",
        price: 104,
        description: "Description 4",
      });
    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE /api/products/:id", () => {
  test("should delete a product", async () => {
    const res = await request(app)
      .delete(`/api/products/${id}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res.statusCode).toBe(200);
  });
});
