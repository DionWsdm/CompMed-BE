import express from 'express';
import likeController from  '../controller/Like';

const router = express.Router();

// CREATE - LIKE
router.post("/:postid", likeController.addLike)

// GET - GET LIKE
router.get("/:userid/:postid", likeController.getLikeByUserAndPostId)
router.get("/", likeController.getUserLikedPost)

// DELETE - UNLIKE
router.delete("/:postid", likeController.deleteLike)

export default router;