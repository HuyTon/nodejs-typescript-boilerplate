import express, { Router } from "express";
import tokenController from "../controllers/tokenController";

const router: Router = express.Router();

router.post("/tokens", tokenController.createToken);

export default router;
