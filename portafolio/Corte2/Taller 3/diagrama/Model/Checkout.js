export class Checkout {
    constructor(book, user, checkoutDate) {
        this.book = book;
        this.user = user;
        this.checkoutDate = checkoutDate;
        this.dueDate = new Date();
        this.dueDate.setDate(this.dueDate.getDate() + 14);  // 14 días de plazo
    }

    isOverdue() {
        return new Date() > this.dueDate;
    }
}
