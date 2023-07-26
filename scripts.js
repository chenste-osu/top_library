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

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author; 
    this.pages = pages;
    this.read = "No";

    if (read == true) {
        this.read = "Yes"
    } 

    this.info = function() {
        return [this.title, this.author, this.pages, this.read];
    }
}

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

function openForm() {
    document.getElementById("formContainer").style.display = "block";
}

function closeForm() {
    document.getElementById("formContainer").style.display = "none";
}

let myLibrary = new Library();

let papan = new Book("papan", "natsuko", 250, true);
let sixteen = new Book("ff16", "yoship", 420, false);
let snowdrops = new Book("A. D. Miller", "Snowdrops", 272, false);

myLibrary.addBookToLibrary(papan);
myLibrary.addBookToLibrary(sixteen);
myLibrary.addBookToLibrary(snowdrops);


let bookForm = document.getElementById("bookForm");
bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let bookForm = document.getElementById("bookForm");
    let formResponses = new FormData(bookForm);

    let newTitle = formResponses.get("title");
    let newAuthor = formResponses.get("author");
    let newPages = formResponses.get("pages");
    let newRead = formResponses.get("readStatus");

    let addBook = new Book(newTitle, newAuthor, newPages, newRead);
    myLibrary.addBookToLibrary(addBook);

    // let title = document.getElementById("formTitle");
    // let author = document.getElementById("formAuthor");
    // let pages = document.getElementById("formPages");
    // let readRadio = document.getElementsByName("readStatus");
    // let readStatus = false; 

    // if (readRadio[0] == "true") {
    //     readStatus = true;
    // } 

    // console.log([title, author, pages, readStatus].join(""));
})


