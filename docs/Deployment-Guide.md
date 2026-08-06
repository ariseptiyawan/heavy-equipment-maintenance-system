# Heavy Equipment Maintenance Intelligence System (HEMIS)

# Deployment Guide

---

## 1. Overview

This document explains how to deploy the Heavy Equipment Maintenance Intelligence System (HEMIS).

The application uses a modern three-tier architecture consisting of:

- Frontend
- Backend API
- Database

---

# 2. Technology Stack

Frontend

- React.js
- Bootstrap

Backend

- Node.js
- Express.js

Database

- PostgreSQL

Authentication

- JWT

Web Server

- Nginx

Container

- Docker

Version Control

- Git
- GitHub

---

# 3. System Requirements

Minimum Server

CPU

- 2 Core

RAM

- 4 GB

Storage

- 40 GB SSD

Operating System

- Ubuntu Server 22.04 LTS

---

# 4. Installation Steps

Clone Repository

```bash
git clone https://github.com/yourusername/heavy-equipment-maintenance-system.git
```

Open Project

```bash
cd heavy-equipment-maintenance-system
```

Install Backend

```bash
npm install
```

Install Frontend

```bash
npm install
```

---

# 5. Database Setup

Create PostgreSQL Database

Example

```
hemis_db
```

Run Migration

```bash
npm run migrate
```

Run Seeder

```bash
npm run seed
```

---

# 6. Environment Variables

Example

```env
PORT=5000

DB_HOST=localhost

DB_PORT=5432

DB_NAME=hemis_db

DB_USER=postgres

DB_PASSWORD=password

JWT_SECRET=secretkey
```

---

# 7. Running Application

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# 8. Docker Deployment

Build Image

```bash
docker build -t hemis .
```

Run Container

```bash
docker run -d -p 5000:5000 hemis
```

---

# 9. Production Recommendation

- Enable HTTPS
- Daily Backup
- Reverse Proxy using Nginx
- Firewall Configuration
- SSL Certificate
- Automatic Monitoring

---

# 10. Future Deployment

- Kubernetes
- Docker Compose
- AWS
- Azure
- Google Cloud
- CI/CD Pipeline

---

Author

Aris Septiyawan

Heavy Equipment Engineering

Indonesia