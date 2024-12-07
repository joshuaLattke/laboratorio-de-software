import { Library } from '../Model/Library.js';
import { Admin } from '../Model/Admin.js';
import { Member } from '../Model/Member.js';
import { Book } from '../Model/Book.js';
import { NotificationManager } from '../Model/NotificationManager.js';
import { Reservation } from '../Model/Reservation.js';
import { Loan } from '../Model/Loan.js';

function main() {
    // Creación de objetos principales
    const library = new Library("City Library");
    const admin = new Admin("Alice", "A001");
    const member = new Member("Bob", "M001");

    // Creación de libros
    const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565");
    const book2 = new Book("1984", "George Orwell", "9780451524935");

    // Agregar libros a la biblioteca por parte del administrador
    admin.addBookToLibrary(library, book1);
    admin.addBookToLibrary(library, book2);

    // Registro de miembros en la biblioteca    
    library.addUser(member);

    // Creación de un préstamo
    const loan = library.createLoan(book1, member);
    if (loan) {
        console.log(`Loan status for "${loan.book.title}":`);
        console.log(`Issued on: ${loan.dateIssued}`);
        console.log(`Due date: ${loan.dueDate}`);
        loan.returnBook(); // Solo se llama si el préstamo fue exitoso
    } else {
        console.error("Failed to create loan for the book.");
    }

    // Envío de notificación
    NotificationManager.sendEmail(member, "Your loan has been created!");

    // Crear una reserva para otro libro
    const reservation = new Reservation(book2, member);
    console.log(`Reservation created for "${reservation.book.title}" by ${reservation.user.name}`);
    reservation.fulfillReservation();
}

main();

