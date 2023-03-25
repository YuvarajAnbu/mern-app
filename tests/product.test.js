const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server/app");
const Product = require("../server/models/Product");

const id = "641e4457836d48b004cd55b1";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWUyNjY4NDczNWU1ZGNjZDFmODIxMSIsImlhdCI6MTY3OTY5OTMwMH0.zcGwQD3dgPMECp5d-Gpa-YMlRg0dGghip_59ygoE8w8";

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

describe("GET /products", () => {
  test("should return all products", async () => {
    const res = await request(app)
      .get("/products")
      .set({ Authorization: `Bearer ${token}` });
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /products/:id", () => {
  test("should return a product", async () => {
    const res = await request(app)
      .get(`/products/${id}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res.statusCode).toBe(200);
  });
});

describe("POST /products", () => {
  test("should create a product", async () => {
    const res = await request(app)
      .post("/products")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        name: "Product 2",
        price: 1009,
        description: "Description 2",
      });

    expect(res.statusCode).toBe(201);
  });
});

describe("PUT /products/:id", () => {
  test("should update a product", async () => {
    const res = await request(app)
      .put(`/products/${id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({
        name: "Product 4",
        price: 104,
        description: "Description 4",
      });
    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE /products/:id", () => {
  test("should delete a product", async () => {
    const res = await request(app)
      .delete(`/products/${id}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res.statusCode).toBe(200);
  });
});
