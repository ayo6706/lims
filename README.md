
# LIMS: Inventory Management Module

## Introduction

The Inventory Management Module is a new feature of  the Laboratory Information Management System (LIMS). It's designed to improve the management of laboratory supplies by tracking inventory levels, automating purchase orders, and optimizing stock levels.

## Getting Started

These instructions will guide you through the process of setting up and running the Inventory Management Module on your local machine for development and testing purposes. r

### Prerequisites
Before you begin, ensure you have the following installed:
- Docker

### Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/ayo6706/lims
   cd lims
   ```
   rename .env.example to .env

2. **Build and Run with Docker Compose**

   Use Docker Compose to build and run the services defined in the `docker-compose.yml` file:

   ```sh
   docker-compose up --build
   ```

   This command will start the backend, frontend, and PostgreSQL database services.

### Services

The application consists of the following services:

- **Backend**: Runs on port 3000, handles all backend logic.
- **Frontend**: Served on port 80, provides the user interface.
- **Postgres**: PostgreSQL database, stores all application data.

## Usage

Once the application is running, you can access the frontend via `http://localhost` in your web browser. Use the interface to manage inventory, generate reports, and view stock levels.

## Database Schema
![db](https://github.com/ayo6706/lims/blob/main/lims.png)

## Swagger Documentation
Goto `http://localhost:3000/api/v1/docs`

## Backend Test
`npm run test`


