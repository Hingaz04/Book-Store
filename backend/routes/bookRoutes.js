import express from "express";
const router = express.Router();
import { Book } from "../models/bookModel.js";

// Route for saving a new book
// POST
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all the books from the database
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get one book from the database by id
router.get("/:id", async (request, response) => {
  try {
    console.log("Received request params:", request.params); // Log request parameters
    const { id } = request.params;
    console.log("Received request for book with ID:", id);
    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).json({ error: "Book not found" });
    }
    return response.status(200).json(book);
  } catch (error) {
    console.error("Error retrieving book:", error.message);
    response.status(500).json({ error: "Internal server error" });
  }
});

// Route for Updating a book
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send({ message: "Book not Found" });
    }

    return response.status(200).send({ message: "Book updated succesfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for deleting a book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({ message: "Book not Found" });
    }

    return response.status(200).send({ message: "Book deleted succesfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
