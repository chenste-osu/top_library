class Library {
    constructor () {
        this.bookData = [];
        this.addBookToLibrary = function(book) {
            this.bookData.push(book);
            addBookDataHTML(book);
        }
        this.info = function() {
            return this.bookData;
        }
    }
}

let myLibrary = new Library();

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author; 
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return [this.title, this.author, this.pages, this.read];
    }
}

let papan = new Book("papan", "natsuko", 250, true);
let sixteen = new Book("ff16", "yoship", 420, false);
let snowdrops = new Book("A. D. Miller", "Snowdrops", 272, false);

myLibrary.addBookToLibrary(papan);
myLibrary.addBookToLibrary(sixteen);
myLibrary.addBookToLibrary(snowdrops);

function getBodyHTML() {
    let libraryTable = document.getElementById("libraryTable")
    let libraryBody = libraryTable.getElementsByTagName("tbody")[0];
    return libraryBody;
}

function addRowHTML(libraryBody) {
    let newRow = libraryBody.insertRow(-1);
    return newRow;
}

function addBookDataHTML(book) {
    let newRow = addRowHTML(getBodyHTML());
    
    for (let i = 0; i < 4; i++) {
        let newCell = newRow.insertCell();
        let newText = document.createTextNode(book.info()[i]);
        newCell.appendChild(newText);
    }
}


