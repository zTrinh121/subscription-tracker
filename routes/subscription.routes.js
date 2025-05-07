import { Router } from 'express';
import authMiddleware from "../middlewares/auth.middleware.js";

import {createSubscription, getUserSubscriptions} from "../controllers/subscription.controller.js";

const subscriptionRoutes = Router();

subscriptionRoutes.get('/', (req, res) => {
    res.send({ title: 'GET all subscriptions'})
})

subscriptionRoutes.get('/:id', authMiddleware, getUserSubscriptions)

subscriptionRoutes.post('/', authMiddleware, createSubscription)

subscriptionRoutes.put('/:id', (req, res) => {
    res.send({ title: 'UPDATE subscription'})
})

subscriptionRoutes.delete('/:id', (req, res) => {
    res.send({ title: 'DELETE subscription'})
})

subscriptionRoutes.get('/users/:id', (req, res) => {
    res.send({ title: 'GET all user subscription'})
})

subscriptionRoutes.get('/:id/cancel', (req, res) => {
    res.send({ title: 'CANCEL subscription'})
})

subscriptionRoutes.get('/upcoming-renewals', (req, res) => {
    res.send({ title: 'GET upcoming renewals'})
})

export default subscriptionRoutes;