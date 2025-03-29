import express from 'express';
import authController from '../controller/Auth';

const router = express.Router();

// LOGIN
router.post("/", authController.login);

// GET
router.get("/info", authController.getAuthInfo)

export default router;