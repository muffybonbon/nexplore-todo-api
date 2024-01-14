# Nexplore Todo API

## Description
Nexplore Todo API is the backend repository for the Nexplore Todo application. This project is built using Express.js and provides RESTful API endpoints for managing todo items. It utilizes PostgreSQL for data persistence and Kysely as a SQL query builder.

## Installation and Setup
Clone the repository:
```shell
$ git clone git@github.com:muffybonbon/nexplore-todo-api.git
```

Navigate to the project directory:
```shell
$ cd nexplore-todo-api
```

Install dependencies:
```shell
$ npm install
```

Create .env file in root level:
```shell
$ touch .env
```

Setup PostgresSQL\
https://www.postgresql.org/docs/current/tutorial-install.html

Place the environment variables in the the `.env` file:
```
NODE_ENV="development"
PORT=8080

UI_PATH="http://localhost:4000"

POSTGRES_DB="nexplore"
POSTGRES_HOST="localhost"
POSTGRES_PORT="5432"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="password"
```

Run seeder:
```shell
$ npm run seed
```
This command initializes the database structure for PostgresSQL.

## Running the Application
Start the development server:
```shell
$ npm start
```
This command starts the server using nodemon for hot reloads.

Build the application for production:
```shell
$ npm run build
```

Serve the built application:
```shell
$ npm run serve
```

Lint the project:
```shell
$ npm run lint
```

## Features
- Express.js for building the API server
- PostgreSQL for data storage
- Kysely for SQL query building
- Express Validator for request validation
- Winston for logging
- Helmet for securing HTTP headers
- CORS for cross-origin resource sharing
- Morgan for HTTP request logging
