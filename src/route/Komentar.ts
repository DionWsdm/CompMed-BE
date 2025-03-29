import express from 'express';
import komentaController from  '../controller/Komentar';

const router = express.Router();

// CREATE - Membuat Komentar
router.post("/", komentaController.createKomentar)

// READ - Lihat Komentar
router.get("/", komentaController.getKomentar)

// UPDATE - Mengubah Komentar
router.patch("/", komentaController.updateKomentar)

// DELETE - Hapus Komentar
router.delete("/", komentaController.deleteKomentar)