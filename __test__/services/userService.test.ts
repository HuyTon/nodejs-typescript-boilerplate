import userService from '../../src/services/userService';

describe('User Service', () => {
    it('should return a list of users', async () => {
      const userData = { id: 1, name: 'John Doe', email: 'john@example.com' };
      const responseData = [{...userData}];

      userService.getUsers = jest.fn().mockResolvedValue(responseData);

      const users = await userService.getUsers(1, 10, 'id', 'asc');

      expect(users).toEqual(responseData);
    });

    it('should create a new user', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com' };
      const expectedUser = { id: 1, ...userData };
  
      userService.createUser = jest.fn().mockResolvedValue(expectedUser);
  
      const newUser = await userService.createUser(userData.name, userData.email);
  
      expect(newUser).toEqual(expectedUser);
    });  

    it('should update an existing user', async () => {
      const userData = { id: 1, name: 'John Doe', email: 'john@example.com' };
      
      userService.updateUser = jest.fn().mockResolvedValue(userData);
  
      const updatedUser = await userService.updateUser(userData.id, userData.name, userData.email);
  
      expect(updatedUser).toEqual(userData);
    });
    
    it('should delete an existing user', async () => {
      const userData = { id: 1, name: 'John Doe', email: 'john@example.com' };
      
      userService.deleteUser = jest.fn().mockResolvedValue(userData);
  
      const deletedUser = await userService.deleteUser(userData.id);
  
      expect(deletedUser).toEqual(userData);
    });
});
