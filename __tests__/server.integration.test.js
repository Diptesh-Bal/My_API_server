import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import Product from "../models/productModel";
import app from "../server";

const MONGO_URL = "mongodb://127.0.0.1:27017/testdb_integration";

describe("Server Integration Tests", () => {
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

  it("should create and retrieve a product", async () => {
    const createRes = await request(app)
      .post("/products")
      .send({ name: "Integration", price: 50, quantity: 5 });
    expect(createRes.status).toBe(200);
    const getRes = await request(app).get(`/products/${createRes.body._id}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.name).toBe("Integration");
  });

  it("should update a product", async () => {
    const prod = await Product.create({
      name: "Integration",
      price: 50,
      quantity: 5,
    });
    const res = await request(app)
      .put(`/products/${prod._id}`)
      .send({ price: 60 });
    expect(res.status).toBe(200);
    expect(res.body.price).toBe(60);
  });

  it("should delete a product", async () => {
    const prod = await Product.create({
      name: "Integration",
      price: 50,
      quantity: 5,
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
});
