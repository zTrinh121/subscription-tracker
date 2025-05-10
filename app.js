import express from 'express';
import cookieParser from "cookie-parser";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { PORT } from "./config/env.js";

import userRoutes from "./routes/user.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import authRoutes from "./routes/auth.routes.js";
import workflowRoutes from "./routes/workflow.routes.js";
import connectToDatabase from "./mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";


const app = express();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Subscription Tracker API',
            version: '1.0.0',
            description: 'API for managing subscription reminders',
        },
        servers: [
            {
                url: 'http://localhost:5500',
            },
            {
                url: 'https://subscription-tracker-eight-rho.vercel.app/',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(arcjetMiddleware)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/subscription', subscriptionRoutes);
app.use('/api/v1/workflows', workflowRoutes);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Please go to /api-docs for more info');
})

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    await connectToDatabase();
})