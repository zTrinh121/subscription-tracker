import { Router } from 'express';
import { getUser, getUsers } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const userRoutes = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
userRoutes.get('/', getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
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
 *         description: The user data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
userRoutes.get('/:id', authMiddleware, getUser);

/**
 * @swagger
 * /users/{id}:
 *   post:
 *     summary: Create a user with the given ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: New user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: User created
 */
userRoutes.post('/:id', (req, res) => {
    res.send({ title: 'CREATE new user' });
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: User updated
 */
userRoutes.put('/:id', (req, res) => {
    res.send({ title: 'UPDATE user' });
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted
 */
userRoutes.delete('/:id', (req, res) => {
    res.send({ title: 'DELETE user' });
});

export default userRoutes;
