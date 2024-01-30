# Nextjs Drizzle Starter Kit

Docker development environment with Nextjs, Drizzle, and Postgres.
Includes Tailwind CSS and Shadcn UI

## Getting Started

Clone the repo

`npm install`
`docker compose up` to start the development environment
`npm run dev` to start the Nextjs development server
`npm run studio` to start the Drizzle Studio

Create schema in lib/schema.ts

`npm run generate` to generate migrations from the schema
`npm run migrate` to run the migrations

Or just

`npm run push` to push the changes made to schema to the database and skip the migrations
