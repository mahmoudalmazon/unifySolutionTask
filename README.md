# Magic Transporters API

## Overview

Magic Transporters is a cutting-edge API that manages the logistics of magical item transportation. This system allows for the creation and management of Magic Movers, magical items, and their transportation missions.

## Features

- Create and manage Magic Movers with specific weight limits
- Add magical items to the inventory
- Load Magic Movers with items for transportation
- Start and end transportation missions
- Track top-performing Magic Movers based on completed missions

## Technical Stack

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- TSyringe for dependency injection

## Prerequisites

- Node.js (v14 or later)
- MongoDB (v4.4 or later)

## Installation

1. Clone the repository:

git clone https://github.com/mahmoudalmazon/unifySolutionTask.git
cd magic-transporters
2. Install dependencies:
npm install
3. Create a `.env` file in the root directory and add your MongoDB connection string:
MONGODB_URI=your_mongodb_connection_string

## Running the Application

To start the development server:
npm run dev

This command will start the server using `ts-node-dev`, which will watch for file changes and automatically restart the server.

The API will be available at `http://localhost:3000` (or the port specified in your environment variables).

## API Endpoints

- `POST /api/magic-movers`: Create a new Magic Mover
- `POST /api/magic-movers/items`: Add a new magical item
- `POST /api/magic-movers/load`: Load a Magic Mover with items
- `POST /api/magic-movers/:magicMoverId/start-mission`: Start a mission for a Magic Mover
- `POST /api/magic-movers/:magicMoverId/end-mission`: End a mission for a Magic Mover
- `GET /api/magic-movers/top`: Get a list of top-performing Magic Movers

To start the test server:
npm run test