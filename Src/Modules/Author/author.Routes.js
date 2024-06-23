import express from 'express';
import {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
} from '../Author/author.Controllers.js';

const router = express.Router();

router.post('/', createAuthor);
router.get('/', getAuthors);
router.get('/:id', getAuthor);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

export default router;
