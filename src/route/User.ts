import express from 'express';
import userController from '../controller/User';

const router = express.Router();

// CREATE
router.post("/", userController.createUser);

// GET
router.get("/getAll", userController.getAllUser);
router.get("/:userId", userController.getUser)

// UPDATE
// router.patch("/:id", use)

export default router;