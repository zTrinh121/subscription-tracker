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

 */
subscriptionRoutes.get('/', (req, res) => {
    res.send({ title: 'GET all subscriptions' });
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         user:
 *           type: string
 *           example: "612b47d9f4a1d925f0d8c7e0"
 *         name:
 *           type: string
 *           example: "Netflix"
 *         amount:
 *           type: number
 *           example: 9.99
 *         renewalDate:
 *           type: string
 *           format: date
 *           example: "2023-12-31"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-05-15T10:00:00Z"
 *     SubscriptionResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Subscription'
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Unauthorized"
 *         error:
 *           type: string
 *           example: "Token verification failed"
 *
 * @swagger
 * /api/v1/subscription/{id}:
 *   get:
 *     tags: [Subscriptions]
 *     summary: Get subscriptions by user ID
 *     description: |
 *       Retrieves all subscriptions for the authenticated user.
 *       - Requires valid JWT token
 *       - User can only access their own subscriptions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         example: "612b47d9f4a1d925f0d8c7e0"
 *         description: Valid MongoDB ObjectId of the user
 *     responses:
 *       200:
 *         description: Subscriptions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriptionResponse'
 *       401:
 *         description: Unauthorized (multiple cases)
 *         content:
 *           application/json:
 *             examples:
 *               noToken:
 *                 value:
 *                   message: "Unauthorized"
 *               invalidToken:
 *                 value:
 *                   message: "Unauthorized"
 *                   error: "Token verification failed"
 *               notOwner:
 *                 value:
 *                   message: "You are not the owner of this subscription"
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
subscriptionRoutes.get('/:id', authMiddleware, getUserSubscriptions);

/**
 * @swagger
 * components:
 *   schemas:
 *     NewSubscription:
 *       type: object
 *       required:
 *         - name
 *         - amount
 *         - renewalDate
 *       properties:
 *         name:
 *           type: string
 *           example: "Netflix Premium"
 *           minLength: 2
 *           maxLength: 100
 *         amount:
 *           type: number
 *           minimum: 0
 *           example: 15.99
 *         renewalDate:
 *           type: string
 *           format: date
 *           example: "2023-12-31"
 *         description:
 *           type: string
 *           example: "4K UHD Plan"
 *           maxLength: 500
 *     CreatedSubscription:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             subscription:
 *               $ref: '#/components/schemas/Subscription'
 *             workflowRunId:
 *               type: string
 *               example: "wf_01H8ZJX0X4A9QJY7Z1ZJZJZJZJ"
 *     SubscriptionError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Transaction failed"
 *         error:
 *           type: string
 *           example: "ValidationError: Path `amount` is required."
 *
 * @swagger
 * /api/v1/subscription:
 *   post:
 *     tags: [Subscriptions]
 *     summary: Create a new subscription
 *     description: |
 *       Creates a new subscription with workflow integration.
 *       - Requires valid JWT authentication
 *       - Automatically associates with authenticated user
 *       - Initiates reminder workflow
 *       - Uses database transaction
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewSubscription'
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreatedSubscription'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriptionError'
 *       401:
 *         description: Unauthorized (invalid/missing token)
 *       500:
 *         description: Transaction failed or workflow error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriptionError'
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
