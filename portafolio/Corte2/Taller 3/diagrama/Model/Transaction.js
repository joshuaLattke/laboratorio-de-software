export class Transaction {
    constructor(book, user, type) {
        this.book = book;
        this.user = user;
        this.type = type;  // 'borrow' o 'return'
        this.date = new Date();
    }

    record() {
        console.log(`${this.user.name} has ${this.type}ed the book "${this.book.title}" on ${this.date}.`);
    }
}
