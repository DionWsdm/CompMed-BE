import express from 'express';
import commentController from  '../controller/Comment';

const router = express.Router();

// CREATE - Membuat Comment
router.post("/:postid", commentController.createComment)

// READ - Lihat Comment
router.get("/:postid", commentController.getCommentByPostId)

// UPDATE - Mengubah Comment
router.patch("/:id", commentController.updateComment)

// DELETE - Hapus Comment
router.delete("/:id", commentController.deleteComment)

export default router;