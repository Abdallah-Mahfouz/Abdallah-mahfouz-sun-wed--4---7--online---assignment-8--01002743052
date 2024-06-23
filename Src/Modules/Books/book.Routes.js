import express from "express";
import {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} from "../Books/book.controllers.js";

const router = express.Router();

router.post("/", createBook);
router.get("/", getBooks);
router.get("/:id", getBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
