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

#### Create Environment Files

Create a `.env` file in the root directory with the following content:

    DATABASE_URL="postgresql://aiuser:user@localhost:5432/ai_project?schema=public"
    OPENAI_API_KEY="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"
    LANGCHAIN_API_KEY="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"
    LANGCHAIN_TRACING_V2=true
    HUGGINGFACE_API_KEY="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"
    JWT_SECRET_KEY="914b7a08e62a403c86a74806f91cfe01a13aab0fb6493466449a68afd6066112"
  
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

## Additional Information

### Backend

- **Node.js**: The backend is built with Node.js and Express.
- **Prisma**: Prisma is used for the ORM.

### Frontend

- **React**: The frontend is built with React.

### Database

- **PostgreSQL**: The application uses PostgreSQL as the database.
