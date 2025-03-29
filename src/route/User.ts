import express from 'express';
import userController from '../controller/User';

const router = express.Router();

// CREATE
router.post("/", userController.createUser);

// GET
router.get("/:userId", userController.getUser)
// router.get("/:id", userController.getUser);

// UPDATE
// router.patch("/:id", use)

export default router;