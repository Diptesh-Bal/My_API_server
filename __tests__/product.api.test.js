import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import Product from "../models/productModel";
import app from "../server";

const MONGO_URL = "mongodb://127.0.0.1:27017/testdb_api";

describe("Product API Integration", () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_URL);
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await Product.deleteMany({});
  });

  it("should create a product", async () => {
    const res = await request(app)
      .post("/products")
      .send({ name: "API Test", price: 100, quantity: 10 });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("API Test");
  });

  it("should get all products", async () => {
    await Product.create({ name: "API Test", price: 100, quantity: 10 });
    const res = await request(app).get("/products");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  it("should get a product by id", async () => {
    const prod = await Product.create({
      name: "API Test",
      price: 100,
      quantity: 10,
    });
    const res = await request(app).get(`/products/${prod._id}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("API Test");
  });

  it("should update a product", async () => {
    const prod = await Product.create({
      name: "API Test",
      price: 100,
      quantity: 10,
    });
    const res = await request(app)
      .put(`/products/${prod._id}`)
      .send({ price: 200 });
    expect(res.status).toBe(200);
    expect(res.body.price).toBe(200);
  });

  it("should delete a product", async () => {
    const prod = await Product.create({
      name: "API Test",
      price: 100,
      quantity: 10,
    });
    const res = await request(app).delete(`/products/${prod._id}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(prod._id.toString());
  });

  it("should return 404 for non-existent product", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/products/${fakeId}`);
    expect(res.status).toBe(404);
  });

  it("should return hello message at root", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello NODE API");
  });

  it("should return blog message at /blog", async () => {
    const res = await request(app).get("/blog");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello Guys, My name is Diptesh Bal");
  });

  it("should return 500 for invalid ObjectId on GET /products/:id", async () => {
    const res = await request(app).get("/products/invalidid");
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message");
  });

  it("should return 500 for invalid ObjectId on PUT /products/:id", async () => {
    const res = await request(app)
      .put("/products/invalidid")
      .send({ price: 123 });
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message");
  });

  it("should return 500 for invalid ObjectId on DELETE /products/:id", async () => {
    const res = await request(app).delete("/products/invalidid");
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message");
  });

  it("should return 500 for POST /products with missing required fields", async () => {
    const res = await request(app).post("/products").send({});
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message");
  });
});
