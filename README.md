
# E-Commerce Site

This is a full-stack e-commerce website built using React (client) and Node.js (server), containerized with Docker. This README file provides instructions on how to pull the necessary Docker images and run the application locally.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Docker Images](#docker-images)
- [Environment Variables](#environment-variables)
- [Running the App Locally](#running-the-app-locally)
- [App Features](#app-features)
- [Contact](#contact)

## Getting Started

Follow the instructions below to get the e-commerce site running locally on your machine using Docker.

## Prerequisites

Before you begin, ensure that you have the following installed on your machine:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Git** (optional, if you want to clone the repository): [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Docker Images

The project consists of two main components:

1. **Client** (React)
2. **Server** (Node.js with Express)

Both of these are available as Docker images. You will pull these images from Docker Hub.

### Pull the Client Image

```bash
docker pull omarmohammed00/client-app
```
### Pull the Server 
```bash
docker pull omarmohammed00/client-app
```
## Environment Variables

### Server Environment Variables

The server requires certain environment variables for it to run. Create a `.env` file inside the `server` directory with the following variables:

```bash
# .env file for the server
DB_USER=<your_database_user>
DB_HOST=<your_database_host>
DB_DATABASE=<your_database_name>
DB_PASSWORD=<your_database_password>
DB_PORT=<your_database_port>
SESSION_SECRET=<your_session_secret>
JWT_SECRET=<your_jwt_secret>
JWT_REFRESH_SECRET=<your_jwt_refresh_secret>
PORT=4000
CLOUDINARY_CLOUD_NAME=<your_cloudinary_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_SECRET_KEY=<your_cloudinary_secret_key>
```
## Running the App Locally

Once you've pulled the images and configured your environment variables, you can run the containers using Docker Compose.



### Step 1: Run Docker Compose

Run the Docker Compose command to start both the server and client containers.

### Step 2: Access the Application

Once the containers are up and running, you can access the application:

- **Client**: Open a browser and go to `http://localhost:3000`.
- **Server**: The server is running at `http://localhost:4000`.

### Step 4: Stopping the Application

Stop the application by running the appropriate command to bring down the containers.

---

## App Features

- **Authentication**: Secure login and registration system.
- **Product Browsing**: Browse through different products, collections, and categories.
- **Shopping Cart**: Add items to your cart and view cart details.
- **Order History**: Track past orders in your profile.
- **Admin Dashboard**: Manage products, users, and categories (accessible to admins).

## Contact

If you need the server `.env` file or have any questions, feel free to reach out to me at `omarmohammedelsayed00@gmail.com`.
