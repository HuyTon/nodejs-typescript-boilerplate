import { Request, Response, NextFunction } from 'express';
import tokenService from "../services/tokenService";


const createToken = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { name, symbol, totalSupply, metadata } = req.body;

    if (!name || !symbol || !totalSupply || totalSupply <= 0) {
      return res.status(400).json({ error: 'Invalid input parameters' });
    }

    const newToken = await tokenService.createToken(name, symbol, totalSupply, metadata);

    res.status(201).json(newToken);
  } catch(error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create token"});
  }
}

export default { createToken };
