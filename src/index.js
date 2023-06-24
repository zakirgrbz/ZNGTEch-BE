import express from 'express';
import "./config/Database.js"
import userRoute from './controller/user-route.js'
import sellnowRoute from './controller/sellnow-route.js'
import contactRoute from './controller/contact-route.js'
import cors from 'cors'
import morgan from "morgan"
import errorHandler from './middleware/errorHandler.js';
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
// API
app.use("/api/v1/users", userRoute);
app.use("/api/v1/sellnow", sellnowRoute);
app.use("/api/v1/contact", contactRoute);
app.use(errorHandler);

export default app;