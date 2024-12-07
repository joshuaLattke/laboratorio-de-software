export class Staff {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }

    issueBook(book, user) {
        console.log(`Book "${book.title}" issued to ${user.name}`);
    }
}
