import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port: number = Number(process.env.PORT) || 3000;
const host: string = process.env.HOST || "localhost";

app.use(express.json());

export { app, port, host };

