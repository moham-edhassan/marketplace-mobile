/*
Backend server for the student marketplace app
*/
//importing dependencies
import express from 'express';
import dotenv from 'dotenv';
import { sql } from './config/db.js';

dotenv.config();

const app = express();

//middleware to parse JSON body
app.use(express.json());

const PORT = process.env.PORT || 5001;


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

app.post("/api/transactions", async(req,res) => {
    try{
        const {title, amount, category, user_id} = req.body;
        if( !title || !user_id || amount === undefined || !category){
            return res.status(400).json({error: "All fields are required"});
        }
        const transaction = await sql`
            INSERT INTO transactions(user_id, title, amount, category)
            VALUES(${user_id}, ${title}, ${amount}, ${category})
            RETURNING *`;
            //returning the transaction data
            console.log(transaction);
            res.status(201).json(transaction[0]);
    }catch(error){
        console.error("Error creating the transaction:", error);
        res.status(500).json({error: "Internal server error"});
    }
})

initDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("server is running on port:", PORT);
    });
})
