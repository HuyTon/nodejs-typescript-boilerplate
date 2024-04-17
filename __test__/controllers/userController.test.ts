import request from 'supertest';
import { Request, Response } from 'express';
import app from '../../src/index';
import userController from '../../src/controllers/userController';
import userService from '../../src/services/userService';

jest.mock('../../src/services/userService');
let req:  Partial<Request>;
let res: Partial<Response>;

describe('getUsers function', () => {
  beforeEach(() => {
    // Mock request and response objects
    req = {
      query: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }; 
  });

  it('should return a list of users when valid parameters are provided', async () => {
    const mockUsers = [{ id: 1, name: 'User1', email: 'user1@example.com' }];
    const expectedStatus = 200;

    // Mock userService.getUsers to return mockUsers
    (userService.getUsers as jest.Mock).mockResolvedValue(mockUsers);

    await userController.getUsers(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(expectedStatus);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  it('should return 404 if no users are found', async () => {
    const expectedStatus = 404;

    // Mock userService.getUsers to return an empty array
    (userService.getUsers as jest.Mock).mockResolvedValue([]);

    await userController.getUsers(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(expectedStatus);
    expect(res.json).toHaveBeenCalledWith({ error: 'No users found' });
  });

  it('should return 400 if invalid pagination parameters are provided', async () => {
    const invalidPage = 'invalidPage';
    const invalidLimit = 'invalidLimit';
    const expectedStatus = 400;

    req.query = { page: invalidPage, limit: invalidLimit };

    await userController.getUsers(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(expectedStatus);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid pagination parameters' });
  });

  it('should return 500 if an error occurs while fetching users', async () => {
    const errorMessage = 'Failed to get users';
    const expectedStatus = 500;

    // Mock userService.getUsers to throw an error
    (userService.getUsers as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await userController.getUsers(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(expectedStatus);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});

describe('User Controller - Create User', () => {  
  beforeEach(() => {
    req = {
      body: {
        name: 'Alex',
        email: 'alex@gmail.com'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });
    
  it('should create a new user', async () => {
    const expectedUser = { id: 1, name: 'Alex', email: 'alex@gmail.com' };
    const expectedStatus = 201;

    (userService.createUser as jest.Mock).mockResolvedValue(expectedUser);

    await userController.createUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(expectedStatus);
    expect(res.json).toHaveBeenCalledWith(expectedUser);
  });

  it('should return 500 if failed to create a new user', async () => {
    const expectedStatus = 500;

    (userService.createUser as jest.Mock).mockRejectedValue(new Error('Failed to create user'));

    await userController.createUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(expectedStatus);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create user' });
  });
});

describe('User Controller - Update User', () => {  
  beforeEach(() => {
    req = {
      params: { id: '1' },      
      body: {
        name: 'John',
        email: 'john@gmail.com'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

    it('should update an existing user', async () => {
      const expectedUser = { id: 1, name: 'John', email: 'john@gmail.com' };
      const expectedStatus = 200;

      (userService.updateUser as jest.Mock).mockResolvedValue(expectedUser);

      await userController.updateUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedUser);
    });

    it('should return 500 if failed to update an existing user', async () => {
      const expectedStatus = 500;

      (userService.updateUser as jest.Mock).mockRejectedValue(new Error('Failed to update user'));

      await userController.updateUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to update user' });
    });
});

describe('User Controller - Delete User', () => {  
  beforeEach(() => {
    req = {
      params: { id: '1' },      
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

    it('should delete an existing user', async () => {
      const expectedStatus = 200;

      (userService.deleteUser as jest.Mock).mockResolvedValue({ message: "User deleted successfully"});

      await userController.deleteUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ message: "User deleted successfully"});
    });

    it('should return 500 if failed delete an existing user', async () => {
      const expectedStatus = 500;

      (userService.deleteUser as jest.Mock).mockRejectedValue(new Error('Failed to delete user'));

      await userController.deleteUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to delete user' });
    });
});