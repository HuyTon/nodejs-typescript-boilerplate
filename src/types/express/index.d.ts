import { Request as ExpressRequest } from 'express';
import { User } from '../user';

// to make the file a module and avoid the TypeScript error
export {}

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
