# Apartment Management Panel

Welcome to the Apartment Management Panel. This mini-project serves as a management platform for renting apartments. The repository is organized into folders for the backend, frontend, and Docker configurations. This project was developed as part of a test task for Nitrix Soft.

## Backend

### Technologies Used

* Node.js: Runtime environment for building scalable and fast applications.

* Express.js: Web framework for routing and middleware handling.

* MongoDB: NoSQL database for storing apartment data.

* Mongoose: ODM library for MongoDB to manage schemas and models.

* Joi: Validation library to ensure incoming requests contain valid data.

### Routes

Base URL: https://<your-app-base-url>/api

*** Endpoints *** 

1.  Create an Apartment

 - Method: POST
 - Endpoint: /create
 - Description: Adds a new apartment to the database.
 - Request Body (JSON):

```shell
{
  "title": "Apartment Center",
  "description": "Clean and tidy apartment in the center of the city",
  "price": 20000,
  "rooms": 3
}
```

 * Response:

- 201: Apartment created successfully.
- 400: Validation errors.

2. Get All Apartments

- Method: GET
- Endpoint: /
- Description: Fetches all apartments from the database.

* Response:

- 200: Returns an array of apartments.

3. Filter by Price

- Method: GET
- Endpoint: /filter/price
- Query Parameters:

price: The maximum price (e.g., /filter/price?price=15000).

* Response:

- 200: Apartments filtered by price.
- 400: Validation errors for invalid input.

4. Filter by Number of Rooms

- Method: GET
- Endpoint: /filter/rooms
- Query Parameters:

rooms: Number of rooms (1, 2, or 3). Example: /filter/rooms?rooms=2.

* Response:

- 200: Apartments filtered by number of rooms.
- 400: Validation errors for invalid input.

5. Delete an Apartment by ID

- Method: DELETE
- Endpoint: /delete/:apartmentId
- Description: Deletes an apartment by its ID.

* Response:

- 200: Apartment deleted successfully.
- 400: Invalid ID format.
- 404: Apartment not found.

6. Update an Apartment by ID

- Method: PUT
- Endpoint: /update/:apartmentId
- Description: Updates information of an apartment by its ID.

* Response:

- 200: Apartment information shown new data.
- 404: Apartment not found.

### Installation

1. Clone the repository:

```shell
git clone https://github.com/GGalina/apartment-management-panel.git
```

2. Navigate to the backend directory:

```shell
cd apartment-management-panel/backend
```

3. Install dependencies:

```shell
npm install
```

4. Create a .env file and add the following:

MONGO_URI=<your-mongodb-connection-string>
PORT=8000

5. Run the application:

```shell
npm start
```

Use Postman or any API client to test the routes.

## Frontend 