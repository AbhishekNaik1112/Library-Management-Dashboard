const { prisma } = require("../config/dbConfig");

exports.getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: { category: true, collection: true },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBook = async (req, res) => {
  const {
    book_name,
    book_cat_id,
    book_collection_id,
    book_launch_date,
    book_publisher,
  } = req.body;
  try {
    const book = await prisma.book.create({
      data: {
        book_name,
        book_cat_id: parseInt(book_cat_id),
        book_collection_id: parseInt(book_collection_id),
        book_launch_date: new Date(book_launch_date),
        book_publisher,
      },
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({
      where: { book_id: parseInt(id) },
      include: { category: true, collection: true },
    });
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const {
    book_name,
    book_cat_id,
    book_collection_id,
    book_launch_date,
    book_publisher,
  } = req.body;
  try {
    const updatedBook = await prisma.book.update({
      where: { book_id: parseInt(id) },
      data: {
        book_name,
        book_cat_id: parseInt(book_cat_id),
        book_collection_id: parseInt(book_collection_id),
        book_launch_date: new Date(book_launch_date),
        book_publisher,
      },
    });
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
