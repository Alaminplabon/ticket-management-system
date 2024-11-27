import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Authentication middleware to verify JWT token
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return; // Early exit after sending response
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
    req.body.userId = decoded.id;
    req.body.role = decoded.role;
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized: Invalid or expired token',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return; // Early exit after sending response
  }
};

// Authorization middleware to check for the required user role
export const authorize = (role: string) => (req: Request, res: Response, next: NextFunction): void => {
  if (req.body.role !== role) {
    res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    return; // Early exit after sending response
  }
  next(); // Continue to the next middleware or route handler
};
