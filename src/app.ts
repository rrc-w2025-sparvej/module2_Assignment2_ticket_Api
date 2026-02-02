import express, { Express, Request, Response } from "express";
import morgan from "morgan";


const app: Express = express();

// Middleware to parse JSON
app.use(express.json());

// HTTP request logging
app.use(morgan("dev"));

// Health check endpoint
app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});



export default app;
