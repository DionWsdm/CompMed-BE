import express from 'express';
import postinganController from '../controller/Postingan'

const router = express.Router();

// CREATE - Buat Postingan
router.post("/", postinganController.createPostingan);

// READ - Lihat Postingan
router.get("/:userid/:id", postinganController.getPostingan);
router.get("/:userid", postinganController.getUserPostingan);
router.get("/", postinganController.getAllPostingan);


// UPDATE - Update Postingan (POST)
router.patch("/:id", postinganController.updatePostingan);

// DELETE - Hapus Postingan
router.delete("/:id", postinganController.deletePostingan);

export default router;