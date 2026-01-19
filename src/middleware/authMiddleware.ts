import { verifyToken } from '../services/jwtService.js';
import type { Request, Response, NextFunction } from "express";
import type { IRequest } from '../interface/IRequest.js';

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'];
    if (!authorization) {
        return res.status(401).json({ message: 'There is no authorization token!' });
    }

    const [scheme, token] = authorization.split(" ");
    if (scheme != 'Bearer' || !token) {
        return res.status(401).json({ message: 'Token is invalid!' });
    }

    try {
        const decodedUser = verifyToken(token);
        (req as IRequest).user = decodedUser;

        next();
    } catch (error) {
        return res.status(401).json({ message: `Invalid token!` });
    }
}

export { authMiddleware };