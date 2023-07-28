class Library {
    constructor () {
        this.bookData = [];
        this.total = 0;
        this.info = function() {
            return this.bookData;
        }
        this.addBookToLibrary = function(book) {
            if (this.getBookIndex(book) != -1) {
                alert("Book already exists in database.");
                return
            }
            this.bookData.push(book);
            this.total++;
            addBookDataHTML(book, this.bookData, this.total, this.toggleStatus, this.getBookIndex);
        }
        this.toggleStatus = (book) => {
            // updates status in array and then returns the new status as string for use in addToggle
            let changedStatus = "";
            let bookIndex = this.getBookIndex(book);
            if (bookIndex == -1 ) {
                return;
            }
            if (this.bookData[bookIndex].read == "No") {
                changedStatus = "Yes";
            } else {
                changedStatus = "No";
            }
            this.bookData[bookIndex].read = changedStatus;
            return changedStatus;
        }
        this.getBookIndex = (book) => {
            for (let i = 0; i < this.bookData.length; i++) {
                if (this.bookData[i].title == book.title 
                    && this.bookData[i].author == book.author
                    && this.bookData[i].pages == book.pages) {
                    return i;
                }
            }
            return -1;
        }
    }
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = "No";
        if (read == true) {
            this.read = "Yes";
        }

        this.info = function () {
            return [this.title, this.author, this.pages, this.read];
        };
    }
}

function getBodyHTML() {
    let libraryTable = document.getElementById("libraryTable")
    let libraryBody = libraryTable.getElementsByTagName("tbody")[0];
    return libraryBody;
}

function addRowHTML(libraryBody, title, total) {
    let newRow = libraryBody.insertRow(-1);
    newRow.id = [title, total].join("");
    return newRow;
}

function addToggle(row, rowid, book, toggleFunc) {
    let newCell = row.insertCell();
    let newToggle = document.createElement("button");
    newToggle.innerHTML = "Toggle Read";
    newToggle.addEventListener("click", ()=> {
        let change = "" + toggleFunc(book);
        let toggleRow = document.querySelector(`#${rowid} :nth-child(4)`);
        toggleRow.innerHTML = change;
    });
    newCell.appendChild(newToggle);
}

function addRemove(row, rowid, book, libraryData, searchFunc) {
    let newCell = row.insertCell();
    let newRemove = document.createElement("button");
    newRemove.innerHTML = "Remove";
    newRemove.addEventListener("click", () => {
        let bookIndex = searchFunc(book);
        libraryData.splice(bookIndex, 1);
        document.getElementById(rowid).remove();
    })
    newCell.appendChild(newRemove);
}

function addBookDataHTML(book, libraryData, libraryTotal, toggleFunction, searchFunction) {
    let newRow = addRowHTML(getBodyHTML(), book.title, libraryTotal);
    for (let i = 0; i < 4; i++) {
        let newCell = newRow.insertCell();
        let newText = document.createTextNode(book.info()[i]);
        newCell.appendChild(newText);
    }
    addToggle(newRow, newRow.id, book, toggleFunction); 
    addRemove(newRow, newRow.id, book, libraryData, searchFunction);
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
let snowdrops = new Book("Snowdrops", "A. D. Miller", 272, false);

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
})


