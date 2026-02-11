import { neon } from '@neondatabase/serverless';
import {PrismaClient} from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

//creates a connection to the database using neon
export const sql = neon(process.env.DATABASE_URL);


