import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Load environment variables from the .env file
config({ path: '.env' });

// Validate environment variables
if (!process.env.TURSO_CONNECTION_URL) {
  throw new Error('TURSO_CONNECTION_URL is not defined in the environment variables.');
}
if (!process.env.TURSO_AUTH_TOKEN) {
  throw new Error('TURSO_AUTH_TOKEN is not defined in the environment variables.');
}

export default defineConfig({
  schema: 'app/db/schema.js', // Use .js file for schema
  out: './migrations',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
});
