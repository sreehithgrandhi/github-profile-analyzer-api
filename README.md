# GitHub Profile Analyzer API

## Overview

GitHub Profile Analyzer API is a backend service built with Node.js, Express.js, and MySQL that fetches public GitHub profile information using the GitHub REST API, analyzes useful profile insights, and stores the results in a MySQL database.

The application also provides APIs to retrieve all analyzed profiles or a specific profile from the database.

---

## Features

* Fetch public GitHub profile data using a username
* Analyze useful profile insights
* Store analysis results in MySQL
* Retrieve all analyzed profiles
* Retrieve a single analyzed profile
* Handle duplicate profile analysis requests
* Environment variable support using dotenv

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* GitHub REST API
* Axios
* dotenv

---

## Project Structure

```text
github-analyzer/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── profileController.js
│   │
│   ├── routes/
│   │   └── profileRoutes.js
│   │
│   └── app.js
│
├── .env
├── .gitignore
├── schema.sql
├── package.json
├── package-lock.json
└── README.md
```

---

## Database Setup

Run the SQL script provided in `schema.sql`.

```sql
CREATE DATABASE github_analyzer;

USE github_analyzer;

CREATE TABLE profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    name VARCHAR(255),
    followers INT,
    following INT,
    public_repos INT,
    account_age_years INT,
    profile_url VARCHAR(255),
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project directory:

```bash
cd github-analyzer
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory.

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=github_analyzer
PORT=5001
```

---

## Running the Application

Start the server:

```bash
node src/app.js
```

Expected output:

```text
MySQL Connected
Server running on port 5001
```

---

## API Endpoints

### Analyze and Store GitHub Profile

Creates a new analyzed profile entry in the database.

```http
POST /api/profiles/:username
```

Example:

```http
POST /api/profiles/octocat
```

---

### Get All Analyzed Profiles

Returns all stored profiles.

```http
GET /api/profiles
```

---

### Get Single Profile

Returns a specific analyzed profile from the database.

```http
GET /api/profiles/:username
```

Example:

```http
GET /api/profiles/octocat
```

---

## Example Response

```json
{
  "id": 1,
  "username": "octocat",
  "name": "The Octocat",
  "followers": 22972,
  "following": 9,
  "public_repos": 8,
  "account_age_years": 15,
  "profile_url": "https://github.com/octocat",
  "analyzed_at": "2025-06-16T04:45:26.000Z"
}
```

---

## Insights Stored

The application stores the following insights:

* GitHub Username
* Name
* Followers Count
* Following Count
* Public Repository Count
* Account Age (Years)
* GitHub Profile URL
* Analysis Timestamp

---

## Author

Developed as part of a Node.js Internship Assignment.
