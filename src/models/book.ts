export class Book {
    public title: string;
    public author: string;
    public reviews: Record<string, string>;

    constructor(title: string, author: string, reviews?: Record<string, string>) {
        this.title = title;
        this.author = author;
        this.reviews = reviews ? reviews : {};
    }
}