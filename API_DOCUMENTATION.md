# API Documentation

## 1. Get API Status

- **Endpoint:** `/`
- **Method:** GET
- **Description:** Returns a welcome message.
- **Sample Response:**
  ```json
  "Hello NODE API"
  ```

## 2. Get Blog Message

- **Endpoint:** `/blog`
- **Method:** GET
- **Description:** Returns a simple introduction message.
- **Sample Response:**
  ```json
  "Hello Guys, My name is Diptesh Bal"
  ```

## 3. Get All Products

- **Endpoint:** `/products`
- **Method:** GET
- **Description:** Retrieves all products from the database.
- **Sample Response:**
  ```json
  [
    {
      "_id": "60c72b2f9b1e8e001c8e4b8a",
      "name": "Sample Product",
      "quantity": 10,
      "price": 99.99,
      "image": "http://example.com/image.jpg",
      "createdAt": "2024-06-01T12:00:00.000Z",
      "updatedAt": "2024-06-01T12:00:00.000Z",
      "__v": 0
    }
  ]
  ```

## 4. Get Product by ID

- **Endpoint:** `/products/:id`
- **Method:** GET
- **Description:** Retrieves a single product by its ID.
- **Sample Response:**
  ```json
  {
    "_id": "60c72b2f9b1e8e001c8e4b8a",
    "name": "Sample Product",
    "quantity": 10,
    "price": 99.99,
    "image": "http://example.com/image.jpg",
    "createdAt": "2024-06-01T12:00:00.000Z",
    "updatedAt": "2024-06-01T12:00:00.000Z",
    "__v": 0
  }
  ```

## 5. Create a Product

- **Endpoint:** `/products`
- **Method:** POST
- **Description:** Creates a new product.
- **Request Body:**
  ```json
  {
    "name": "Sample Product",
    "quantity": 10,
    "price": 99.99,
    "image": "http://example.com/image.jpg"
  }
  ```
- **Sample Response:**
  ```json
  {
    "_id": "60c72b2f9b1e8e001c8e4b8a",
    "name": "Sample Product",
    "quantity": 10,
    "price": 99.99,
    "image": "http://example.com/image.jpg",
    "createdAt": "2024-06-01T12:00:00.000Z",
    "updatedAt": "2024-06-01T12:00:00.000Z",
    "__v": 0
  }
  ```

## 6. Update a Product

- **Endpoint:** `/products/:id`
- **Method:** PUT
- **Description:** Updates an existing product by its ID.
- **Request Body:** (any updatable fields)
  ```json
  {
    "name": "Updated Product",
    "quantity": 5,
    "price": 49.99
  }
  ```
- **Sample Response:**
  ```json
  {
    "_id": "60c72b2f9b1e8e001c8e4b8a",
    "name": "Updated Product",
    "quantity": 5,
    "price": 49.99,
    "image": "http://example.com/image.jpg",
    "createdAt": "2024-06-01T12:00:00.000Z",
    "updatedAt": "2024-06-01T12:10:00.000Z",
    "__v": 0
  }
  ```

## 7. Delete a Product

- **Endpoint:** `/products/:id`
- **Method:** DELETE
- **Description:** Deletes a product by its ID.
- **Sample Response:**
  ```json
  {
    "_id": "60c72b2f9b1e8e001c8e4b8a",
    "name": "Sample Product",
    "quantity": 10,
    "price": 99.99,
    "image": "http://example.com/image.jpg",
    "createdAt": "2024-06-01T12:00:00.000Z",
    "updatedAt": "2024-06-01T12:00:00.000Z",
    "__v": 0
  }
  ```
