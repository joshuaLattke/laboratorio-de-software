export  class LibraryCard {
    constructor(user) {
        this.user = user;
        this.cardNumber = Math.floor(Math.random() * 1000000);
    }
}
