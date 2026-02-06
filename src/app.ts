import express from "express";
import morgan from "morgan";

import ticketRoutes from "./api/v1/routes/ticketRoutes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// health check endpoint
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// ticket API routes
app.use("/api/v1/tickets", ticketRoutes);


export default app;
