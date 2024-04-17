import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../types/user';

const SECRET_KEY = 'secret key';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).json({ error: 'Unauthorized'});        
    }

    try {
        // Verify token
        const decodedToken = jwt.verify(token, SECRET_KEY);
        
        // Attach user information to request object
        req.user = decodedToken as User;
        
        next();
    } catch(error) {
        res.status(401).json({ error: "Invalid Token"});
    }
};

export const authorizeUserRole = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user?.role;
        if(!userRole || userRole !== requiredRole) {
            return res.status(403).json({ error: 'Forbidden'});
        }
        next();
    };
};