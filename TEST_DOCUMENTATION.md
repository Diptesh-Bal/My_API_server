# Test Documentation

## Overview

This document describes the testing strategy, structure, and coverage for the My_API_server project. It details the types of tests implemented, the tools used, and how to run and interpret the results.

---

## Test Types Implemented

### 1. Unit Tests

- **Location:** `__tests__/productModel.unit.test.js`
- **Purpose:**
  - Test the Product model's schema, validation, and default values.
  - Ensure required fields are enforced and defaults are set.
  - Includes both real (non-mocking) and mocked database scenarios (using Vitest's mocking utilities).
- **Coverage:**
  - Model validation (required fields, default values)
  - Model save and retrieval
  - Mocked save method

### 2. Integration Tests

- **Location:** `__tests__/server.integration.test.js`
- **Purpose:**
  - Test the interaction between the API server and the MongoDB database.
  - Ensure CRUD operations work as expected with real database interaction.
  - Verify error handling for not-found and invalid ID cases.
- **Coverage:**
  - Create, read, update, delete product
  - 404 for non-existent product
  - Error for invalid ObjectId

### 3. API (End-to-End) Tests

- **Location:** `__tests__/product.api.test.js`
- **Purpose:**
  - Test the full API endpoints as a user would interact with them.
  - Ensure correct status codes, response bodies, and error handling.
  - Cover all main routes, including `/`, `/blog`, and `/products` endpoints.
- **Coverage:**
  - All CRUD endpoints
  - Root and blog endpoints
  - Error cases: invalid ObjectId, missing fields, not found

---

## Test Tools & Frameworks

- **[Vitest](https://vitest.dev/):** Main testing framework for unit, integration, and API tests.
- **[Supertest](https://github.com/ladjs/supertest):** For HTTP assertions in API/integration tests.
- **Mongoose:** Used for model and database interaction.

---

## How to Run the Tests

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run all tests and generate coverage:**
   ```bash
   npx vitest run --coverage
   ```
3. **View coverage report:**
   Open `coverage/index.html` in your browser for a detailed report.

---

## Test Coverage Summary

- **Statements:** ~81%
- **Branches:** ~80%
- **Functions:** 100%
- **Lines:** ~81%
- See the README and coverage screenshot for details.

---

## Test Structure

```
My_API_server/
  └── __tests__/
      ├── productModel.unit.test.js      # Unit tests for Product model
      ├── server.integration.test.js     # Integration tests for server and DB
      └── product.api.test.js            # API (end-to-end) tests for all endpoints
```

---

## Notes

- All tests use a test database to avoid polluting production data.
- The app is structured to allow importing the Express app for isolated testing.
- Error handling and edge cases are covered for robust API behavior.

---

For any questions or contributions, see the main [README.md](./README.md).
