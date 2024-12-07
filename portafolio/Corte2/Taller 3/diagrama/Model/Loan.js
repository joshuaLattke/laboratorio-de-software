// Clase Loan
export class Loan {
    constructor(book, user) {
        this.book = book;
        this.user = user;
        this.dateIssued = new Date(); // Fecha actual
        this.dueDate = new Date();   // Calcula la fecha de vencimiento (ejemplo: 14 días después)
        this.dueDate.setDate(this.dateIssued.getDate() + 14);
        this.isReturned = false;
    }

    returnBook() {
        this.isReturned = true;
        console.log(`Book "${this.book.title}" returned by ${this.user.name}.`);
    }
}
