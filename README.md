# Pokémon Management System

## Overview
This is a full-stack Pokémon management system that allows you to fetch, add, update, and delete Pokémon data.

## Backend
- Built using Python, FastAPI, SQLAlchemy, and Pydantic.
- Fetches Pokémon data from the PokeAPI and stores it in a PostgreSQL/SQLite database.
- Run the backend:
 ```bash
python -m venv venv
.\venv\Scripts\activate
pip install uvicorn
pip install fastapi[all]
pip install sqlalchemy
pip install psycopg2-binary
# Create a .env file and add the following:
# DATABASE_URL=postgresql+psycopg2://pokemon_user:amit1234@localhost/pokemon_db
uvicorn main:app --reload
```

  Swagger UI is available at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

## Frontend
- Built using React with TypeScript and Axios.
- Also used Bootstrap ui for designing
- Run the frontend:
  ```bash
  npm i
  npm start
  make sure the Frontend is running in Localhost:3000 (To avoid cors issues)
  ```

## Tech Stack
- Backend: FastAPI, SQLAlchemy, PostgreSQL, Pydantic
- Frontend: React, TypeScript, Axios

## Features
- List all Pokémon
- Add new Pokémon
- Edit existing Pokémon
- View Pokémon details

## Installation
Clone the repository and set up both the backend and frontend as per the instructions above.

## ⚠️ Important: Sensitive Information
This project contains sensitive information such as .env files and database URLs to make it easier for you to run the project locally. Please follow these steps carefully:

.env File:

The .env file included in this project contains environment variables, such as the DATABASE_URL.
Please do not share or upload this file publicly, as it may expose sensitive information.
Database URL:

The DATABASE_URL in the .env file is preconfigured for this project to use a local PostgreSQL database.
If you wish to use a different database, update the DATABASE_URL in the .env file with the appropriate connection string.
Examples:

PostgreSQL: postgresql://username:password@localhost/dbname
Running the Project:

The project is designed to work seamlessly with the provided configuration. To ensure it runs correctly:
Use the .env file as provided.
Install all dependencies using the instructions above.
