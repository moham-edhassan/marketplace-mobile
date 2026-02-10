import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.confif();

//creates a connection to the database using neon
export const sql = neon(process.env.DATABASE_URL);

