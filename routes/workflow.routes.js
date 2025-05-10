import { Router } from "express";
import { sendReminders } from "../controllers/workflow.controller.js";

const workflowRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Workflow
 *   description: Subscription reminder workflows
 */

/**
 * @swagger
 * /workflow/subscription/reminder:
 *   post:
 *     summary: Trigger reminder workflow for a subscription
 *     tags: [Workflow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subscriptionId
 *             properties:
 *               subscriptionId:
 *                 type: string
 *                 example: 66225e195361f472bca81c94
 *     responses:
 *       200:
 *         description: Reminder workflow triggered
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
workflowRouter.post("/subscription/reminder", sendReminders);

export default workflowRouter;
