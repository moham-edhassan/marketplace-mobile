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




app.get("/", (req,res) => {
    res.send("The API is working properly");
})

