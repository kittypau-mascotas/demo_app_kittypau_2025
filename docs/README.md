# KittyPau IoT Platform

Welcome to the KittyPau IoT Platform project! This repository contains the backend and bridge components for managing IoT devices for pets, integrated with a modern cloud-native stack.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
- [Running the Project](#running-the-project)
  - [IoT Bridge (EC2 Component)](#iot-bridge-ec2-component)
  - [Backend API (Vercel Component)](#backend-api-vercel-component)
- [Detailed Documentation](#detailed-documentation)

## Overview

KittyPau is an IoT platform designed to monitor and manage pet-related devices. This project focuses on the backend infrastructure that handles data ingestion from IoT devices, stores it in a PostgreSQL database (Neon), and exposes it via a RESTful API for a web frontend.

## Architecture

The platform leverages a scalable, event-driven architecture:

*   **IoT Devices**: ESP8266/ESP32 devices publishing MQTT messages.
*   **MQTT Broker**: AWS IoT Core for secure and scalable message routing.
*   **IoT Bridge (EC2 Component)**: A Node.js application running on an EC2 instance. It subscribes to MQTT topics, processes incoming data (sensor readings and device status), and persists it into the Neon PostgreSQL database.
*   **Database**: Neon PostgreSQL for robust and scalable data storage.
*   **Backend API (Vercel Component)**: An Express.js application deployed on Vercel. It exposes RESTful endpoints for the frontend, providing authenticated access to user data, devices, pets, and historical sensor/event data.
*   **Authentication**: Neon Auth handles user identity and authentication.
*   **Frontend**: A web application (e.g., React, Next.js) consumes the Backend API.

## Setup and Installation

### Prerequisites

Ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)
*   [Drizzle-kit](https://orm.drizzle.team/kit-docs/overview): For managing database migrations. Install globally or locally: `npm install -g drizzle-kit`

### Environment Variables

Copy the `.env.example` file to `.env` in the root of your project and fill in the necessary values:

```
cp .env.example .env
```

Key environment variables include:

*   `DATABASE_URL`: Connection string for your Neon PostgreSQL database.
*   `AWS_IOT_ENDPOINT`: Your AWS IoT Core endpoint.
*   `AWS_IOT_PRIVATE_KEY_PATH`: Path to your IoT device private key file.
*   `AWS_IOT_CERT_PATH`: Path to your IoT device certificate file.
*   `AWS_IOT_ROOT_CA_PATH`: Path to your AWS IoT root CA certificate file.
*   `NEON_AUTH_URL`: Your Neon Auth instance URL.

### Database Setup

The database schema is managed using Drizzle ORM and Drizzle Kit.

1.  **Apply Migrations**: Ensure your database schema is up-to-date with the `schema.sql` and `shared/schema.ts` definitions.
    ```bash
    drizzle-kit push:pg
    ```
    This command will apply any pending migrations to your Neon database.

## Running the Project

The project is split into two main components: the IoT Bridge (EC2) and the Backend API (Vercel).

### IoT Bridge (EC2 Component)

This component handles MQTT communication and database persistence.

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Build the TypeScript code**:
    ```bash
    npm run build
    ```
3.  **Run the bridge**:
    ```bash
    node dist/server/index.js # Or use pm2 for production deployment
    ```
    Ensure all AWS IoT and DATABASE_URL environment variables are correctly set for this component.

### Backend API (Vercel Component)

This component serves the RESTful API endpoints for the frontend.

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Build the TypeScript code**:
    ```bash
    npm run build
    ```
3.  **Run the API locally (for development)**:
    ```bash
    npm run dev
    ```
    For production, this component is designed for deployment on Vercel. Ensure `DATABASE_URL` and `NEON_AUTH_URL` environment variables are configured in your Vercel project settings.

## Detailed Documentation

For a comprehensive understanding of the project's architecture, data model, API contract, and detailed implementation notes, please refer to:

[docs/project_specifications.md](docs/project_specifications.md)
