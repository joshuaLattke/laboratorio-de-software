import { Loan } from './Loan.js';

export class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
        this.users = [];
        this.loans = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    addUser(user) {
        this.users.push(user);
    }

    createLoan(book, user) {
        // Verifica si el libro existe en la biblioteca y si está disponible
        if (this.books.includes(book) && book.isAvailable) {
            const loan = new Loan(book, user); // Crea el préstamo
            this.loans.push(loan);            // Lo agrega a la lista de préstamos
            book.isAvailable = false;        // Marca el libro como prestado

            // Registra el préstamo en el historial del usuario
            if (user.loanHistory) {
                user.loanHistory.addLoan(loan);
            }

            console.log(`Loan created for book: ${book.title}`);
            return loan; // Retorna el préstamo creado
        } else {
            console.log(`Book "${book.title}" is not available.`);
            return null; // Devuelve null si no se puede crear el préstamo
        }
    }
}
