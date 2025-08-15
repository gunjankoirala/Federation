import dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD === '' ? undefined : process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
} as const;
