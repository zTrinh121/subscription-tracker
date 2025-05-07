import express from 'express';
import cookieParser from "cookie-parser";

import { PORT } from "./config/env.js";

import userRoutes from "./routes/user.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import authRoutes from "./routes/auth.routes.js";
import connectToDatabase from "./mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/subscription', subscriptionRoutes);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    await connectToDatabase();
})