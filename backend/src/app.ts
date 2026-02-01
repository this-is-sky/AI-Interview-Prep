import express from 'express';
import cors from 'cors';

import authRoutes from "./routes/auth.routes.js";
import interviewRoutes from "./routes/interview.routes.js"
import healthRoutes from "./routes/health.routes.js"
import resumeRoutes from "./routes/resume.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/resume", resumeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/health", healthRoutes);

export default app;