import authorModel from "../../../Models/author.Models.js";

//================================================
const getAuthors = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const skip = (page - 1) * limit;

  try {
    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { bio: { $regex: search, $options: "i" } },
      ],
    };

    const authors = await authorModel
      .find(query)
      .populate("books", "title")
      .skip(skip)
      .limit(Number(limit));

    const totalAuthors = await authorModel.countDocuments(query);

    res.status(200).json({
      authors,
      totalPages: Math.ceil(totalAuthors / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//================================================
const getAuthor = async (req, res) => {
  try {
    const author = await authorModel
      .findById(req.params.id)
      .populate("books", "title");
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json({ msg: "done", author });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//================================================
const createAuthor = async (req, res) => {
  try {
    const { name, bio, birthDate } = req.body;
    const author = await authorModel.create({ name, bio, birthDate });
    res.status(201).json({ msg: "done", author });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//================================================
const updateAuthor = async (req, res) => {
  try {
    const { name, bio, birthDate } = req.body;
    const author = await authorModel.findByIdAndUpdate(
      req.params.id,
      { name, bio, birthDate },
      { new: true }
    );
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//================================================

const deleteAuthor = async (req, res) => {
  try {
    const author = await authorModel.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json({ message: "Author deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//================================================
export { createAuthor, getAuthors, getAuthor, updateAuthor, deleteAuthor };
