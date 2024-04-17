# Cricket API

This is a backend API for a cricket platform, similar to Cricbuzz. It allows admins to manage matches, players, and teams, and guest users to view match schedules and details.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints and Testing](#api-endpoints-and-testing)
- [SQL Queries](#sql-queries)
- [Assumptions](#assumptions)

## Prerequisites

- Node.js (version 14.x or later)
- PostgreSQL (version 12.x or later)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/LifeAyush/anakin-assignment.git
   ```
   
2. Navigate to the project directory:

   ```bash
   cd anakin-assignment
   ```

3. Install Dependencies:

   ```bash
   npm install
   ```

## Database Setup

The Cricket API uses PostgreSQL as the database. You'll need to create a new PostgreSQL database and update the connection details in the .env file.

  1. Create a new PostgreSQL database or use the default database named postgres
  2. Run the SQL queries provided in the SQL Queries section to create the necessary tables

## Environment Variables

The Cricket API uses environment variables to store sensitive information, such as database credentials and the JWT secret key. Create a .env file in the root directory of the project and add the following variables:

  ```dotenv
  PORT=3000
  DB_USER=your_postgres_username
  DB_PASSWORD=your_postgres_password
  DB_HOST=localhost
  DB_NAME=your_db_name
  DB_PORT=5432
  JWT_SECRET=your_secret_key
  ```
Replace the values with your actual PostgreSQL credentials and a secret key for JWT.

## API Endpoints and Testing

The Cricket API provides the following endpoints:

1. Register Admin: [POST] /api/admin/signup
   
   Testing : Use Postman, send a POST request on above url with username, password and email in the body.

   Sample Body Data :
   ```json
   {
    "username" : "Admin123",
    "password" : "pass@123",
    "email" : "admin@gmail.com"
   }
   ```
   
2. Login Admin: [POST] /api/admin/login
   
   Testing: Use Postman, send a POST request on above url with username and password in the body and access token in the autherization bearer token

   Sample Body Data :
   ```json
   {
      "username" : "Admin123",
      "password" : "pass@123"
   }
   ```
   
3. Create Match: [POST] /api/admin/matches
   
   Testing : Use Postman, send a POST request on above url with team1, team2, date, venue in the body and access token in the autherization bearer token

   Sample Body Data :
   ```json
   {
    "team1" : "India",
    "team2" : "England",
    "date" : "2023-07-10",
    "venue" : "Lord's Cricket Ground"
   }
   ```
   
4. Get Match Schedules: [GET] /api/matches
   
   Testing : Use Postman, send a GET request on above url

5. Get Match Details: [GET] /api/matches/:matchId
   
   Testing : Use Postman, send a GET request on above url

6. Add a Team Member to a Squad: [POST] /api/admin/teams/:teamId/squad

   Testing : Use Postman, send a POST request on above url with name and role in the body and access token in the autherization bearer token

   Sample Body Data :
   ```json
   {
    "name" : "Virat Kohli",
    "role" : "batsman"
   }
   ```

7. Get Player Statistics: [GET] /api/players/:playerId/stats
   
   Testing : Use Postman, send a GET request on above url

## SQL Queries

Here are the SQL queries to initialize the database:

  ```sql
  CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  team1 VARCHAR(255) NOT NULL,
  team2 VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  venue VARCHAR(255) NOT NULL,
  status VARCHAR(255) DEFAULT 'upcoming',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  matches_played INT DEFAULT 0,
  runs INT DEFAULT 0,
  average FLOAT DEFAULT 0,
  strike_rate FLOAT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  match_id INT NOT NULL,
  player_id INT NOT NULL,
  FOREIGN KEY (match_id) REFERENCES matches(id),
  FOREIGN KEY (player_id) REFERENCES players(id)
);
```

## Assumptions

- The status field in the matches table can have the following values: upcoming, in_progress, completed.
- The role field in the players table can have values like batsman, bowler, all-rounder, wicket-keeper, etc.
- The teams table is used to store the players in each team for a match.
