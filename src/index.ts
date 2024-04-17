import path from "path";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import errorHandler from "./utils/errorHandler";
import validateApiKey from "./middlewares/apiKeyMiddleware";
import jwt from 'jsonwebtoken';
import { authenticateUser, authorizeUserRole } from "./middlewares/authMiddleware";

const app: Express = express();

dotenv.config({path: path.resolve(__dirname, '../.env')});

const PORT: string = process.env.PORT || '3000';

// Enable body parser
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// app.use("/api", validateApiKey, userRoutes);
app.use("/api", userRoutes);

app.get("/api/admin", authenticateUser, authorizeUserRole('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin!'});
})

app.post("/api/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if(username === 'admin' && password === 'password') {
    // Generate jwt token
    const SECRETE_KEY = 'secret key';
    const token = jwt.sign({username: 'admin', role: 'admin'}, SECRETE_KEY);
    res.json({ token});
  } else {
    res.status(401).json({ error: 'Invalid credentials'});
    }  
});

app.use((err: Error, req: Request, res: Response, next: () => void) => {
  errorHandler(err, req, res, next);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;