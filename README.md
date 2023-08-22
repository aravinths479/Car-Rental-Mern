# Vehicle Rental Platform

## Description
This project is a web-based vehicle rental platform with a React frontend and a Node.js backend. It simplifies vehicle rentals, allowing users to search, book, and manage their rentals seamlessly. Key features include real-time availability, transparent reviews, and efficient damage tracking, enhancing the rental experience for both users and vehicle owners.

## Getting Started
- **Backend Setup:**
  1. Navigate to the `backend` directory using `cd backend`.
  2. Install dependencies with `npm install`.
  3. Create a `.env` file in the `backend` directory and add the following configuration:
     ```
     PORT=4000
     MONGO_URI=mongodb://localhost:27017/carRental
     SECRET=ninjadojoshifuyoshimarioluigipeachbowser
     ADMIN_PORT=4001
     DB_ADMISTRATION_IP=127.0.0.1
     ```
  4. Start the backend server with `npm start`.

- **Frontend Setup:**
  1. Navigate to the `frontend` directory using `cd frontend`.
  2. Install dependencies with `npm install`.
  3. Start the frontend with `npm start`.

## Usage
- To access the frontend, open your browser and go to `http://localhost:3000`.
- To access the backend admin panel, open your browser and go to `http://localhost:4001`.

## Contributions
Contributions are welcome. Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## License
This project is licensed under the [MIT License](LICENSE).
