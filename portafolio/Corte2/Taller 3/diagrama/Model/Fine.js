export class Fine {
    constructor(user, amount) {
        this.user = user;
        this.amount = amount;
        this.dateIssued = new Date();
    }

    payFine() {
        console.log(`Fine of $${this.amount} has been paid.`);
    }
}
