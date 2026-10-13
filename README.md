# Cricket API

This is an interview exercise: a cricket API for matches, players, and teams. Admins manage matches and squads. Guests can view match schedules, match details, and player statistics.

## Prerequisites

- Node.js 14 or later
- PostgreSQL 12 or later

## Setup

```bash
git clone https://github.com/LifeAyush/cricket-api.git
cd cricket-api
npm install
```

Create a PostgreSQL database, or use the default database named `postgres`. Then run the schema SQL below.

## Environment variables

Create a `.env` file in the project root:

```dotenv
PORT=3000
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_NAME=your_db_name
DB_PORT=5432
JWT_SECRET=your_secret_key
```

## Endpoints

Protected admin routes need the access token from login as `Authorization: Bearer <token>`.

### POST /api/admin/signup

```json
{
  "username": "Admin123",
  "password": "pass@123",
  "email": "admin@gmail.com"
}
```

### POST /api/admin/login

```json
{
  "username": "Admin123",
  "password": "pass@123"
}
```

### POST /api/admin/matches

```json
{
  "team1": "India",
  "team2": "England",
  "date": "2023-07-10",
  "venue": "Lord's Cricket Ground"
}
```

### GET /api/matches

Match schedules.

### GET /api/matches/:matchId

Match details.

### POST /api/admin/teams/:teamId/squad

```json
{
  "name": "Virat Kohli",
  "role": "batsman"
}
```

### GET /api/players/:playerId/stats

Player statistics.

## Database schema

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

- Match `status` is `upcoming`, `in_progress`, or `completed`.
- Player `role` is a value such as batsman, bowler, all-rounder, or wicket-keeper.
- The `teams` table stores the players in each team for a match.

## License

MIT. Copyright (c) 2024 Ayush Patil.
