import { User } from './User.js';
 export class Admin extends User {
    constructor(name, id) {
        super(name, id);
    }

    addBookToLibrary(library, book) {
        library.addBook(book);
        console.log(`Admin added book: ${book.title}`);
    }
}
