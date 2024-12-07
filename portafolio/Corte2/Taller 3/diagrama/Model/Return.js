export class Return {
    constructor(book, user, returnDate) {
        this.book = book;
        this.user = user;
        this.returnDate = returnDate;
    }

    processReturn() {
        if (this.isOverdue()) {
            console.log("This book is overdue!");
        } else {
            console.log(`Book "${this.book.title}" returned on time.`);
        }
    }

    isOverdue() {
        return this.returnDate > this.book.dueDate;
    }
}
