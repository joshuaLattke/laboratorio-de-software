import { LoanHistory } from './LoanHistory.js';

export class User {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.loanHistory = new LoanHistory();
    }
}