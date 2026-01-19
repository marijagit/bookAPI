import type { Request, Response, NextFunction } from "express";

function validateCredentials(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    if (!username || !password || username === '' || password === '') {
        return res.status(400).json({ message: `Username and password must be valid!` });
    }

    next();
}

export { validateCredentials };