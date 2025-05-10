import { Router } from 'express';
import authMiddleware from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Subscription management endpoints
 */

/**
 * @swagger
 * /api/v1/subscription:
 *   get:
 *     tags: [Subscriptions]
 *     summary: Get all subscriptions
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 */
subscriptionRoutes.get('/', (req, res) => {
    res.send({ title: 'GET all subscriptions' });
});

/**
 * @swagger
 * /api/v1/subscription/{id}:
 *   get:
 *     tags: [Subscriptions]
 *     summary: Get subscriptions by user ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Subscriptions retrieved successfully
 */
subscriptionRoutes.get('/:id', authMiddleware, getUserSubscriptions);

/**
 * @swagger
 * /api/v1/subscription:
 *   post:
 *     tags: [Subscriptions]
 *     summary: Create a new subscription
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       201:
 *         description: Subscription created
 */
subscriptionRoutes.post('/', authMiddleware, createSubscription);

/**
 * @swagger
 * /api/v1/subscription/{id}:
 *   put:
 *     tags: [Subscriptions]
 *     summary: Update a subscription
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       200:
 *         description: Subscription updated
 */
subscriptionRoutes.put('/:id', (req, res) => {
    res.send({ title: 'UPDATE subscription' });
});

/**
 * @swagger
 * /api/v1/subscription/{id}:
 *   delete:
 *     tags: [Subscriptions]
 *     summary: Delete a subscription
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription deleted
 */
subscriptionRoutes.delete('/:id', (req, res) => {
    res.send({ title: 'DELETE subscription' });
});

/**
 * @swagger
 * /api/v1/subscription/users/{id}:
 *   get:
 *     tags: [Subscriptions]
 *     summary: Get all subscriptions for a specific user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User subscriptions retrieved
 */
subscriptionRoutes.get('/users/:id', (req, res) => {
    res.send({ title: 'GET all user subscription' });
});

/**
 * @swagger
 * /api/v1/subscription/{id}/cancel:
 *   get:
 *     tags: [Subscriptions]
 *     summary: Cancel a subscription
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription cancelled
 */
subscriptionRoutes.get('/:id/cancel', (req, res) => {
    res.send({ title: 'CANCEL subscription' });
});

/**
 * @swagger
 * /api/v1/subscription/upcoming-renewals:
 *   get:
 *     tags: [Subscriptions]
 *     summary: Get upcoming renewals
 *     responses:
 *       200:
 *         description: List of upcoming renewals
 */
subscriptionRoutes.get('/upcoming-renewals', (req, res) => {
    res.send({ title: 'GET upcoming renewals' });
});

export default subscriptionRoutes;
