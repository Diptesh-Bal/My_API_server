import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import mongoose from "mongoose";
import Product from "../models/productModel";

// Mocking mongoose connection for isolated unit tests
const MONGO_URL = "mongodb://127.0.0.1:27017/testdb";

describe("Product Model Unit Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  it("should require a name and price", async () => {
    const product = new Product({});
    let err;
    try {
      await product.validate();
    } catch (error) {
      err = error;
    }
    expect(err.errors.name).toBeDefined();
    expect(err.errors.price).toBeDefined();
  });

  it("should set default quantity to 0", async () => {
    const product = new Product({ name: "Test", price: 10 });
    expect(product.quantity).toBe(0);
  });

  it("should save a valid product", async () => {
    const product = new Product({ name: "Test", price: 10, quantity: 5 });
    const saved = await product.save();
    expect(saved._id).toBeDefined();
    expect(saved.name).toBe("Test");
    expect(saved.price).toBe(10);
    expect(saved.quantity).toBe(5);
  });

  it("should allow saving with an image", async () => {
    const product = new Product({
      name: "Test2",
      price: 20,
      quantity: 2,
      image: "img.png",
    });
    const saved = await product.save();
    expect(saved.image).toBe("img.png");
  });
});

// Mocking approach

describe("Product Model (Mocked)", () => {
  it("should call save and return the product", async () => {
    const saveMock = vi.fn().mockResolvedValue({
      _id: "mockid",
      name: "Mock",
      price: 1,
      quantity: 1,
    });
    Product.prototype.save = saveMock;
    const product = new Product({ name: "Mock", price: 1, quantity: 1 });
    const saved = await product.save();
    expect(saveMock).toHaveBeenCalled();
    expect(saved.name).toBe("Mock");
  });
});
