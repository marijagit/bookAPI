import express from 'express';
import type { Request, Response } from 'express';
import { books } from '../config/booksdb.js';
import type { IRequest } from '../interface/IRequest.js';

const protectedBookController = express.Router();

protectedBookController.get('/:isbn', (req: Request, res: Response) => {
    const isbnTxt = req.params?.isbn as string;
    if (!isbnTxt) {
        return res.status(400).json({ message: `Isbn is required!` });
    }

    const isbn = parseInt(isbnTxt);
    if (Number.isNaN(isbn)) {
        return res.status(400).json({ message: `Isbn must be valid!` });
    }

    const book = books[isbn];
    if (!book) {
        return res.status(404).json({ message: `Book with the isbn: ${isbn} could not be found.` });
    }

    const username = (req as IRequest).user.username;
    const review = book.reviews[username];
    if (!book.reviews || !review) {
        return res.status(404).json({ message: `Book with the isbn: ${isbn} does not have any reviews by the user ${username}.` });
    }

    return res.status(200).json(review);
});

protectedBookController.post('/:isbn', (req: Request, res: Response) => {
    const isbnTxt = req.params?.isbn as string;
    const review = req.body?.review;
    if (!isbnTxt || !review) {
        return res.status(400).json({ message: `Isbn and review are required!` });
    }

    const isbn = parseInt(isbnTxt);
    if (Number.isNaN(isbn)) {
        return res.status(400).json({ message: `Isbn must be valid!` });
    }

    const book = books[isbn];
    if (!book) {
        return res.status(404).json({ message: `Book with the isbn: ${isbn} could not be found.` });
    }

    if (!book.reviews) {
        book.reviews = {};
    }

    const username = (req as IRequest).user.username;

    book.reviews[username] = review;

    return res.status(201).json({ message: `Review has been added successfully`, book });
});

protectedBookController.delete('/:isbn', (req: Request, res: Response) => {
    const isbnTxt = req.params.isbn as string;
    if (!isbnTxt) {
        return res.status(400).json({ message: `Isbn and review are required!` });
    }

    const isbn = parseInt(isbnTxt);
    if (Number.isNaN(isbn)) {
        return res.status(400).json({ message: `Isbn must be valid!` });
    }

    const book = books[isbn];
    if (!book) {
        return res.status(404).json({ message: `Book with the isbn: ${isbn} could not be found.` });
    }

    const username = (req as IRequest).user.username;

    if (!book.reviews![username]) {
        return res.status(404).json({ message: `There is no review for the book with isbn ${isbn} from the user: ${username}` });
    }

    delete book.reviews![username];

    return res.status(200).json({ message: `Review from ${username} has been successfully removed.` });
});


export { protectedBookController };
