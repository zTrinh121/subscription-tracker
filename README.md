# Subscription Tracker API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)

A backend API for managing subscription services with automated reminders and spam protection.

## Features

- **User Authentication**: JWT-based auth system
- **Subscription Management**: Full CRUD operations
- **Workflow Automation**: Upstash-powered reminder system
- **Security**: Arcjet spam protection
- **Documentation**: Swagger/OpenAPI support

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB
- **Services**:
    - Upstash (Workflows & QStash)
    - Arcjet (Rate limiting)
- **Authentication**: JWT

## API Documentation

Interactive documentation available at `/` when running locally:

![Swagger UI](https://example.com/swagger-screenshot.png)

## Installation

1. Clone the repository
```bash
git clone https://github.com/zTrinh121/subscription-tracker.git
cd subscription-tracker