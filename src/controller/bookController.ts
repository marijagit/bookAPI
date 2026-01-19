import express from 'express';
import { books } from '../config/booksdb.js';
import { Book } from '../models/book.js';
import type {Request, Response} from 'express';

const bookController = express.Router();

//get all the books
bookController.get('/', (req, res) => {
    return res.status(200).json(books);
});

//get books by the author
bookController.get('/author/:author', (req, res) => {
    const author = req.params.author.toLowerCase();
    if (!author || author === '') {
        return res.status(400).json({ message: 'Author is required!' });
    }

    let booksByAuthor: Book[] = [];

    for (let book of Object.values(books)) {
        if (book.author.toLowerCase() === author) {
            booksByAuthor.push(book);
        }
    }

    if (booksByAuthor.length === 0) {
        return res.status(404).json({ message: `Couldn't find books by the author ${author}` });
    }
    return res.status(200).json(booksByAuthor);
});

//get books by the isbn
bookController.get('/isbn/:isbn', (req, res) => {
    const isbnTxt = req.params.isbn;
    if (!isbnTxt) {
        return res.status(400).json({ message: 'Isbn is required!' });
    }
    const isbn = parseInt(isbnTxt);
    if (Number.isNaN(isbn)) {
        return res.status(400).json({ message: 'Isbn must be valid!' });
    }

    const book = books[isbn];
    if (!book) {
        return res.status(404).json({ message: `Book with the isbn ${isbn} not found.` });
    }

    return res.status(200).json(book);
});

//get books by the title
bookController.get('/title/:title', (req: Request, res: Response) => {
    let title = (req.params.title as string).toLowerCase();
    if (!title || title === '') {
        return res.status(400).json({ message: 'Title is required!' });
    }

    let booksWithTitle: Book[] = [];
    for (let book of Object.values(books)) {
        if (book.title.toLowerCase().includes(title)) {
            booksWithTitle.push(book);
        }
    }
    if (booksWithTitle.length === 0) {
        return res.status(404).json({ message: `Couldn't find books with the title: ${title}` });
    }
    return res.status(200).json(booksWithTitle);
});

export { bookController };
