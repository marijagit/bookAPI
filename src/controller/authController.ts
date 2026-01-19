import { JWT_SECRET } from '../config/config.js';
import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js'
import type { NextFunction, Request, Response } from "express";

const authController = express.Router();

const users: User[] = [];

authController.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username);

    if (user) {
        return res.status(409).json({ message: 'User already exists. Please log in.' });
    }

    try {
        const user = await User.create(username, password);
        users.push(user);
        return res.status(201).json({ message: `User with the username: ${username} has been successfully created.` });
    }
    catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
});

authController.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (!JWT_SECRET) {
        return res.status(500).json({ message: 'JWT secret is not set!' })
    }

    let wantedUser = users.find((u) => u.username === username);

    if (!wantedUser) {
        return res.status(404).json({ message: `User with the username: ${username} does not exist.` });
    }

    try {
        const match = await wantedUser.validatePassword(password);
        if (match) {
            const token = jwt.sign({ username: username }, JWT_SECRET, { expiresIn: "1h" });
            return res.status(200).json({ accessToken: token });
        }
        return res.status(401).json({ message: `Password is incorrect!` });
    } catch (error) {
        return res.status(500).json({ message: 'Unable to login. Please try again' });
    }
});

export { authController };
