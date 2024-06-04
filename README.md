# AI Project

This project is a full-stack application using Node.js, Express, React, jsonwebtoken, Prisma, PostgreSQL, openAI, huggingface and Langfuse.

## Prerequisites

- Node.js, npm and pnpm
- PostgreSQL

## Setup Instructions

### 1. Install Dependencies

#### Start PostgreSQL

have your postgreSQL listening on port 5432 (default)
depending on your machine start postgresql and login as superuser

    psql -U postgres
    
#### Create a Database and User

Create a new database and user:

    CREATE DATABASE ai_project;
    CREATE USER aiuser WITH ENCRYPTED PASSWORD 'user';
    ALTER USER aiuser CREATEDB;
    GRANT ALL PRIVILEGES ON DATABASE ai_project TO aiuser;
    \c ai_project;
    ALTER DATABASE ai_project OWNER TO aiuser;
    \q

### 3. Configure the Environment

#### Clone the Repository

    git clone https://github.com/mamisla/dotien_task.git
    cd dotien_task

#### Create Environment File

Create a `.env` file in the root directory with the .env file data you got in email (api keys are sensitive data).
  
### 4. Configure Backend

#### Install Dependencies

    pnpm install

#### Set Up Prisma

Generate Prisma client:

    npx prisma generate

Apply migrations:

    npx prisma migrate dev --name init

### 5. Configure Frontend

#### Navigate to the Frontend Directory

    cd web

#### Install Dependencies

    npm install

### 6. Run app

    cd ..
    npm start

### 7. Enter app
Type in your web browser

    localhost:3000

## Additional Information

### Backend

- **Node.js**: The backend is built with Node.js and Express.
- **Prisma**: Prisma is used for the ORM.

### Frontend

- **React**: The frontend is built with React.

### Database

- **PostgreSQL**: The application uses PostgreSQL as the database.
