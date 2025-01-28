# Apartment Management Panel

Welcome to the Apartment Management Panel. This mini-project serves as a management platform for renting apartments. The repository is organized into folders for the backend, frontend, and Docker configurations. This project was developed as part of a test task for Nitrix Soft.

## Backend

### Technologies Used

* Node.js: Runtime environment for building scalable and fast applications.

* Express.js: Web framework for routing and middleware handling.

* MongoDB: NoSQL database for storing apartment data.

* Mongoose: ODM library for MongoDB to manage schemas and models.

* Joi: Validation library to ensure incoming requests contain valid data.

* Cloudinary: Cloud-based image and video management service used for uploading, storing, and serving apartment photos.

* Docker: Docker is used in this project to containerize the backend application, ensuring a consistent and reproducible environment for development, testing, and deployment.

* Render: Render is used to deploy and host the backend API, providing a scalable, reliable cloud infrastructure for serving the application to users.

### Routes

Base URL: https://apartment-management-panel.onrender.com/api

*** Endpoints *** 

1.  Create an Apartment

 - Method: POST
 - Endpoint: /create
 - Description: Adds a new apartment to the database.
 - Request Body (JSON):

```shell
    {
        "_id": "679672d1de3da7f26496df88",
        "title": "Cozy 2-Bedroom Apartment",
        "description": "Spacious 2-bedroom apartment in a quiet neighborhood. Open living area with natural light, fully equipped kitchen, and ample closet space. Close to shops, restaurants, and public transport. Perfect for small families or young professionals. Pet-friendly and ready to move in!",
        "price": 1000,
        "rooms": 2,
        "photos": [
            "https://res.cloudinary.com/dug34gqr9/image/upload/v1737913040/apartments/oivxme4lr5smu9pcwgvc.jpg",
            "https://res.cloudinary.com/dug34gqr9/image/upload/v1737913041/apartments/g411kts51vetlwwbss2h.jpg"
        ],
        "createdAt": "2025-01-26T17:37:21.504Z",
        "updatedAt": "2025-01-26T17:37:21.504Z"
    }
```

 Response:

- 201: Apartment created successfully.
- 400: Validation errors.

2. Get All Apartments

- Method: GET
- Endpoint: /
- Description: Fetches all apartments from the database.

 Response:

- 200: Returns an array of apartments.

3. Filter by Price

- Method: GET
- Endpoint: /filter/price
- Query Parameters:

price: The maximum price (e.g., /filter/price?price=15000).

 Response:

- 200: Apartments filtered by price.
- 400: Validation errors for invalid input.

4. Filter by Number of Rooms

- Method: GET
- Endpoint: /filter/rooms
- Query Parameters:

rooms: Number of rooms (1, 2, or 3). Example: /filter/rooms?rooms=2.

 Response:

- 200: Apartments filtered by number of rooms.
- 400: Validation errors for invalid input.

5. Delete an Apartment by ID

- Method: DELETE
- Endpoint: /delete/:apartmentId
- Description: Deletes an apartment by its ID.

 Response:

- 200: Apartment deleted successfully.
- 400: Invalid ID format.
- 404: Apartment not found.

6. Update an Apartment by ID

- Method: PUT
- Endpoint: /update/:apartmentId
- Description: Updates information of an apartment by its ID.

 Response:

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
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

5. Run the application:

```shell
npm start
```

Use Postman or any API client to test the routes.

## Frontend 

### Technologies Used

* React: JavaScript library for building user interfaces, providing a component-based architecture for building SPAs.

* React-Redux: State management library used to manage the global application state through Redux.

* @reduxjs/toolkit: Provides a simplified and efficient way to configure and manage Redux states.

* Axios: Promise-based HTTP client used to make requests to the backend API.

* React-Toastify: Library used for displaying notifications in the app.

* React-Splide: Carousel slider component used to display apartment images.

* Normalize.css: CSS file that provides consistent styling for HTML elements across browsers.

* React-Spinners: A library of loading spinners to indicate when content is being loaded.

### Features

* Apartment Listings: Display a list of all available apartments with a preview of their information (e.g., title, description, price, rooms).

* Filtering: Filter apartments by price and number of rooms.

* Apartment Details: View detailed information about a selected apartment, including photos and description.

* Update Apartment: Open a modal to update an apartment's details.

* Delete Apartment: Delete an apartment listing directly from the modal.


### Installation

1. Clone the repository:

```shell
git clone https://github.com/GGalina/apartment-management-panel.git
```

2. Navigate to the frontend directory:

```shell
cd apartment-management-panel/frontend
```

3. Install dependencies:

```shell
npm install
```

3. Run the application:
```shell
npm start
```
The app should now be running at http://localhost:3000.

## Docker and Deployment

This project uses Docker to containerize both the frontend and backend, ensuring consistency and portability across environments. Each service has its own Dockerfile for building its respective container.

### Docker in the Project

* Backend:

The backend is containerized using Docker and has been deployed to Render, which provides a simple and scalable hosting solution for Dockerized backend services.

* Frontend:
The frontend is also Dockerized, making it easy to deploy alongside the backend. Render is used for deploying the frontend from the same repository.

### Deployment

Backend: https://apartment-management-panel.onrender.com

Frontend: https://apartment-management-panel-frontend.onrender.com