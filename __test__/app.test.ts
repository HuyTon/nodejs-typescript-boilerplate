import request from 'supertest';
import app from '../src/index';
import userService from '../src/services/userService';

jest.mock('../src/services/userService');

describe('App testing API endpoints', ()=> {
    it('should create a new user', async () => {
        const userData = { name: 'John Doe', email: 'john@example.com' };
        const expectedUser = { id: 1, ...userData };

        (userService.createUser as jest.Mock).mockResolvedValue(expectedUser);

        const response = await request(app).post('/api/users').send(userData);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(expectedUser);
    });
})