**Cat Lover App**

Overview

This application is a React-based web app for managing and displaying cat images. Users can browse cat images, view detailed information about cat breeds, and manage their favorite images. The app integrates with a backend API for fetching data and supports modern React features such as hooks and context for state management.


**API Integration**

The app integrates with a backend API to fetch and manage data.

**Endpoints**

 - GET /breeds: Fetches a list of cat breeds.

- GET /images/search: Fetches random cat images.

- GET /favourites: Fetches the user's favorite cat images.

- POST /favourites: Adds an image to the user's favorites.

- DELETE /favourites/:id: Removes an image from the user's favorites.

**Axios Instance (apiClient.ts)**

 - Configures a centralized Axios instance with base URL and headers for API requests.

- Includes error handling via interceptors

**Features**

1. Image Gallery: Display a grid of cat images with a "Load More" functionality.

2. Favorites Management: Add or remove cat images from favorites.

3. Breed Information: View detailed information about specific cat breeds.

4. Error Handling: Provides user-friendly error messages.

5. Responsive Design: Utilizes react-bootstrap for a consistent, responsive UI.

6. Global State Management: Shares the favorites state across components using the Context API.

**Installation and Setup**

1. yarn install
2. yarn start