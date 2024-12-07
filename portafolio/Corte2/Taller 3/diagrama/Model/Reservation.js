export class Reservation {
    constructor(book, user) {
        this.book = book;
        this.user = user;
        this.dateReserved = new Date();
        this.isFulfilled = false;
    }

    fulfillReservation() {
        this.isFulfilled = true;
        console.log(`Reservation for "${this.book.title}" by ${this.user.name} has been fulfilled.`);
    }
}
