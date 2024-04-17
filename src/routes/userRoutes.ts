import express, { Router } from "express";
import userController from "../controllers/userController";

const router: Router = express.Router();

router.post("/users", userController.createUser);

router.put("/users/:id", userController.updateUser);

router.delete("/users/:id", userController.deleteUser);

router.get("/users", userController.getUsers);

export default router;
