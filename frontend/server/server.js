import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from "./middleware/rate-limit.js"
dotenv.config({
    path: ".env.dev"
});

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
app.use(rateLimit);
app.listen(PORT || 5001,()=>{
    console.log("======================================");
    console.log("🚀 Expense Tracker Gateway Started");
    console.log(`🌐 Server : http://localhost:${PORT}`);
    console.log(`🕒 Started: ${new Date().toLocaleString()}`);
    console.log("======================================");
});