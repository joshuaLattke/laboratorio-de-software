 export class LoanHistory {
    constructor() {
        this.loans = [];
    }

    addLoan(loan) {
        this.loans.push(loan);
    }

    listLoans() {
        return this.loans;
    }
}