import { Request, Response, NextFunction } from 'express';
import userService from "../services/userService";


const createUser = async (req: Request, res: Response) => {
  try{
    const { name, email } = req.body;

    if(!name || !email) {
      return res.status(400).json({ error: "Name and email are required"});
    }

    const newUser = await userService.createUser(name, email);

    res.status(201).json(newUser);
  } catch(error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user"});
  }
}

const updateUser = async (req: Request, res: Response) => {
  try{
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    if(isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid id parameter"});
    }

    if(!name || !email) {
      return res.status(400).json({ error: "Name and email are required"});
    }

    const updatedUser = await userService.updateUser(id, name, email);

    res.status(200).json(updatedUser);
  } catch(error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user"});
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try{
    const id = parseInt(req.params.id);

    if(isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid id parameter"});
    }

    await userService.deleteUser(id);

    res.status(200).json({ message: "User deleted successfully"});
  } catch(error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user"});
  }
}

const getUsers = async (req: Request, res: Response) => {
  try { 
    if((req.query.page && Number.isNaN(parseInt(req.query.page as string))) || 
    (req.query.limit && Number.isNaN(parseInt(req.query.limit as string)))) {
      return res.status(400).json({ error: "Invalid pagination parameters" });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortField = req.query.sortField as string || "id";
    const sortOrder = req.query.sortOrder as string || "asc";

    if(Number.isNaN(page) || page < 1 || Number.isNaN(limit) || limit < 1) {
      return res.status(400).json({ error: "Invalid pagination parameters" });
    }

    const users = await userService.getUsers(page, limit, sortField, sortOrder);

    if(users && users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ error: "No users found"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get users'});
  }
};

export default { createUser, updateUser, deleteUser, getUsers};
