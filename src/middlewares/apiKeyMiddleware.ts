import { Request, Response, NextFunction } from 'express';
import apiKeyData from "../data/apiKeyData";
import jwt, { JwtPayload } from 'jsonwebtoken';

const  isJwtPayload = (obj: any): obj is JwtPayload => {
  return typeof obj === 'object' && 'apiKey' in obj;
}

const validateApiKey = async (req: Request, res: Response, next: NextFunction) => {
  let apiKey = req.header("x-api-key");

  if (!apiKey) {
    apiKey = req.header("Authorization");

    if (!apiKey || !apiKey.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized! Missing bearer token." });
    }

    const token = apiKey.substring("Bearer ".length);
    
    // Assuming token is a string containing a JWT
    let decodedToken: JwtPayload;

    try {
      // Decode the token to extract the API key
      decodedToken = jwt.verify(token, "SECRET_KEY") as JwtPayload;

       // Check if the decoded token is actually a JwtPayload
       if (!isJwtPayload(decodedToken)) {
        throw new Error('Invalid token');
      }

      apiKey = decodedToken.apiKey;
    } catch (error) {
      console.error("Error validating API key:", error);
      return res
        .status(401)
        .json({ error: "Unauthorized! Failed to validate API key." });
    }
  }

  if(!apiKey) {
    return res.status(401).json({ error: "Unauthorized!" });
  }

  const isValid = await apiKeyData.isValidApiKey(apiKey);
  if (!isValid) {
    return res.status(401).json({ error: "Unauthorized!" });
  }
  next();
};

export default validateApiKey;
