# Robot Management System API

A TypeScript + Node.js + Express + TypeORM backend for managing robots, their status, and activity logs.

## Features

- Register robots
- Update robot status
- Retrieve robot information
- Create and retrieve robot activity logs
- Optional: SQLite support, Docker ready

## Tech Stack

- **Node.js** + **TypeScript**
- **Express.js**
- **TypeORM**
- **SQLite** (default, can switch to MySQL/Postgres)
- **UUID** for IDs

## Prerequisites

- Node.js >= 18
- npm >= 9
- Optional: Docker (if using Docker setup)

---

## Project Structure
```
robot-api/
├── src/
│   ├── controllers/           # Express route handlers
│   │   ├── robotController.ts
│   │   └── logController.ts
│   │
│   ├── services/              # Business logic
│   │   ├── robotService.ts
│   │   └── logService.ts
│   │
│   ├── repositories/          # Data access layer
│   │   ├── robotRepository.ts
│   │   └── logRepository.ts
│   │
│   ├── entities/              # TypeORM entities (DB models)
│   │   ├── Robot.ts
│   │   └── Log.ts
│   │
│   ├── infra/                 # Infrastructure setup
│   │   └── db.ts              # TypeORM DataSource initialization
│   │
│   └── server.ts              # Express app entry point
│
├── dist/                      # Compiled JS files (from TypeScript)
├── node_modules/              # Node dependencies
├── package.json               # Project metadata + scripts
├── tsconfig.json              # TypeScript configuration
├── .gitignore                 # Git ignore rules
└── README.md                  # Project documentation
```

### Folder/Files Description

| Folder/File | Description |
|-------------|-------------|
| `src/controllers/` | Handles HTTP requests and sends responses. Calls services for business logic. |
| `src/services/` | Contains core business logic, interacts with repositories or entities. |
| `src/repositories/` | Data access layer for custom DB operations or queries using TypeORM Repository. |
| `src/entities/` | TypeORM entity definitions representing database tables. |
| `src/infra/` | Infrastructure setup (DB connection, DataSource initialization). |
| `src/server.ts` | Entry point. Initializes DB and starts Express server. |
| `dist/` | Output folder after compiling TypeScript to JavaScript (`npm run build`). |
| `package.json` | Dependencies, scripts (start, dev, build, init-db). |
| `tsconfig.json` | TypeScript configuration (decorators, module resolution, etc). |
| `.gitignore` | Excludes node_modules, build output, environment files, SQLite DB, IDE configs. |

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/robot-api.git
cd robot-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Initialize database
```bash
npm run init-db
```

For SQLite, it creates `db.sqlite` automatically.

You should see:
```
📦 Database connected successfully!
```

### 4. Run server in development
```bash
npm run dev
```

### 5. Run server in production
```bash
npm run start
```

### 6. Build for production
```bash
npm run build
node dist/server.js
```

---

## Package Scripts
```json
{
  "scripts": {
    "start": "ts-node src/server.ts",
    "dev": "ts-node-dev --respawn src/server.ts",
    "build": "tsc",
    "init-db": "ts-node src/infra/db.ts"
  }
}
```

| Script | Command | Purpose |
|--------|---------|---------|
| `start` | `ts-node src/server.ts` | Runs server in production (without watching) |
| `build` | `tsc` | Compiles TypeScript into JavaScript (dist/ folder) |
| `dev` | `ts-node-dev --respawn src/server.ts` | Runs server in development mode with auto-reload |
| `init-db` | `ts-node src/infra/db.ts` | Initializes DB and runs any sync scripts |

---

## API Endpoints

Base URL: `http://localhost:3000`

### 1️⃣ Create Robot

**POST** `/robots`

**Request Body:**
```json
{
  "name": "AlphaBot",
  "type": "delivery",
  "status": "idle"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "name": "AlphaBot",
  "type": "delivery",
  "status": "idle",
  "battery": 100,
  "mode": "idle",
  "location": null,
  "error_state": null,
  "created_at": "2025-12-01T00:00:00.000Z",
  "updated_at": "2025-12-01T00:00:00.000Z"
}
```

---

### 2️⃣ Get All Robots

**GET** `/robots`

**Response (200):**
```json
[
  {
    "id": "uuid",
    "name": "AlphaBot",
    "type": "delivery",
    "status": "idle",
    "battery": 100,
    "mode": "idle",
    "location": null,
    "error_state": null
  }
]
```

---

### 3️⃣ Get Robot by ID

**GET** `/robots/:id`

**Response (200):**
```json
{
  "id": "uuid",
  "name": "AlphaBot",
  "type": "delivery",
  "status": "idle",
  "battery": 100,
  "mode": "idle",
  "location": null,
  "error_state": null,
  "logs": []
}
```

**Error (404):**
```json
{
  "error": "Robot not found"
}
```

---

### 4️⃣ Update Robot Status

**PATCH** `/robots/:id/status`

**Request Body:**
```json
{
  "status": "active",
  "battery": 85,
  "location": "Zone A",
  "mode": "active",
  "error_state": null
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "name": "AlphaBot",
  "type": "delivery",
  "status": "active",
  "battery": 85,
  "mode": "active",
  "location": "Zone A",
  "error_state": null,
  "created_at": "2025-12-01T00:00:00.000Z",
  "updated_at": "2025-12-01T01:00:00.000Z"
}
```

**Error (404):**
```json
{
  "error": "Robot not found"
}
```

---

### 5️⃣ Get Robot Status Only

**GET** `/robots/:id/status`

**Response (200):**
```json
{
  "status": "active",
  "battery": 85,
  "location": "Zone A",
  "mode": "active",
  "error_state": null
}
```

**Error (404):**
```json
{
  "error": "Robot not found"
}
```

---

### 6️⃣ Create Robot Log

**POST** `/logs`

**Request Body:**
```json
{
  "robotId": "uuid",
  "level": "info",
  "message": "Robot started moving",
  "metadata": { "speed": 5 }
}
```

**Response (201):**
```json
{
  "id": "uuid-log",
  "robot": { "id": "uuid" },
  "level": "info",
  "message": "Robot started moving",
  "metadata": "{\"speed\":5}",
  "created_at": "2025-12-01T01:10:00.000Z"
}
```

**Error (404):**
```json
{
  "error": "Robot not found"
}
```

---

### 7️⃣ Get Logs for a Robot

**GET** `/logs/:robotId`

Optional: filter by level

**GET** `/logs/:robotId?level=error`

**Response (200):**
```json
[
  {
    "id": "uuid-log",
    "level": "info",
    "message": "Robot started moving",
    "metadata": "{\"speed\":5}",
    "created_at": "2025-12-01T01:10:00.000Z"
  },
  {
    "id": "uuid-log2",
    "level": "error",
    "message": "Wheel malfunction",
    "metadata": "{\"wheel\":\"front-left\"}",
    "created_at": "2025-12-01T01:15:00.000Z"
  }
]
```

---

## Example cURL Commands

### Create Robot
```bash
curl -X POST http://localhost:3000/robots \
  -H "Content-Type: application/json" \
  -d '{"name":"AlphaBot","type":"delivery","status":"idle"}'
```

### Update Status
```bash
curl -X PATCH http://localhost:3000/robots/ROBOT_ID/status \
  -H "Content-Type: application/json" \
  -d '{"status":"active","battery":85,"location":"Zone A"}'
```

### Create Log
```bash
curl -X POST http://localhost:3000/logs \
  -H "Content-Type: application/json" \
  -d '{"robotId":"ROBOT_ID","level":"info","message":"Started moving"}'
```

---

## .gitignore
```
# Node modules
/node_modules/

# TypeScript build output
/dist/
/build/

# Environment variables
.env
.env.local
.env.*.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Database files (for SQLite)
*.sqlite
*.sqlite3
*.db

# OS generated files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.sublime-project
*.sublime-workspace
```

---

## Optional: Docker Setup

Create a Dockerfile (Node + TypeScript + SQLite).

### Build image:
```bash
docker build -t robot-api .
```

### Run container:
```bash
docker run -p 3000:3000 robot-api
```

---

## Database

- **Default:** SQLite (`db.sqlite`)
- **Entities:** Robot and Log
- **Auto-sync:** `synchronize: true` in TypeORM

---

## Notes

- Default DB: SQLite (`db.sqlite`)
- Auto-synchronize schema with TypeORM (`synchronize: true`)
- Use `ts-node-dev` for hot-reload during development
- Ensure `reflect-metadata` and `experimentalDecorators` enabled in `tsconfig.json`

---