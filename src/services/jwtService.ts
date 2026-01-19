import { JWT_SECRET } from '../config/config.js';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';

function generateToken(payload: JwtPayload) {
    try {
        const token = jwt.sign(payload, JWT_SECRET!);  // add expiration time in prod
        return token;
    } catch (error) {
        throw error;
    }
}

function verifyToken(token: string): JwtPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET!) as JwtPayload;
    } catch (error) {
        console.log((error as Error).message);
        return null;
    }
}

export { generateToken, verifyToken };