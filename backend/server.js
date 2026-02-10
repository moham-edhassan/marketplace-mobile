/*
Backend server for the student marketplace app
*/
//importing dependencies
import express from 'express';
import dotenv from 'dotenv';
import { sql } from './config/db.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3003;


async function initDB(){
    try{
        //creates the transactions table if it doesn't exist
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
        console.log("db initialized successfully");
    }catch(error){
        console.error("Error initializing db:", error);
        //status code 1 means error, 0 would mean success
        process.exit(1);
    }
}

app.get('/',(req,res) =>{
    res.send("It's working 123");
})

initDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("server is running on port:", PORT);
    });
})
