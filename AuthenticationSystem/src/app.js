import express from 'express';
import morgan from 'morgan';
import authRouter from '../routes/auth.routes.js';
import cookieParser from "cookie-parser";
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const app = express();

const limiter = rateLimit({
    windowMs: 0.25 * 60 * 1000, // 15 seconds
    max: 4, // Limit each IP to 4 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
})

app.use(limiter);
app.use(helmet());
app.use(express.json({limit: '10kb'}));
app.use(morgan("dev"))

app.use(cookieParser());

app.use("/api/auth" , authRouter);

export default app;