import bookModel from "../../../Models/book.Models.js";
import authorModel from "../../../Models/author.Models.js";
//================================================

const getBooks = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const skip = (page - 1) * limit;

  try {
    const query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ],
    };

    const books = await bookModel
      .find(query)
      .populate("author", "name")
      .skip(skip)
      .limit(Number(limit));

    const totalBooks = await bookModel.countDocuments(query);

    res.status(200).json({
      books,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//================================================

const createBook = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;

    const book = await bookModel.create({ title, content, author: authorId });

    await authorModel.findByIdAndUpdate(authorId, {
      $push: { books: book._id },
    });

    res.status(201).json({ msg: "done", book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//================================================
const getBook = async (req, res) => {
  try {
    const book = await bookModel
      .findById(req.params.id)
      .populate("author", "name");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//================================================
const updateBook = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const book = await bookModel.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//================================================
const deleteBook = async (req, res) => {
  try {
    const book = await bookModel.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted", book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//================================================
export { createBook, getBooks, getBook, updateBook, deleteBook };
