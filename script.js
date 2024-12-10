const myLibrary = [];

function Book(id, title, author, genre, pages, daysCreated) {

    this.id = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages
    this.daysCreated = daysCreated

}

function addBookToLibrary(title, author, genre, pages, daysCreated=0) {
    bookName = new Book(myLibrary.length, title, author, genre, pages, daysCreated)
    myLibrary.push(bookName)

}

addBookToLibrary("The Lost Horizon", "James Hilton", "Adventure", 256, 3);
addBookToLibrary("Celestial Stories", "Aria Moon", "Fantasy", 1021, 3);
addBookToLibrary("Deep Space Journey", "Liam Vega", "Science Fiction", 732, 3);


function clearLibrary() {
    const bookLibrary = document.getElementsByClassName('book-library')[0];
    bookLibrary.innerHTML = '';
}

function renderLibrary(library) {
    clearLibrary();
    const bookLibrary = document.getElementsByClassName('book-library')[0];
    for (let i = 0; i < library.length; i++ ) {

        const bookLink = document.createElement('a');
        bookLink.classList.add("list-group-item", "list-group-item-action");

        if (i + 1 == library.length) {
            bookLink.classList.add("active");
        }

        // Container and columns
        const bookContainer = document.createElement('div');
        bookContainer.classList.add("d-flex", "w-100", "justify-content-between", "book-container");

        const containerLeftColumn = document.createElement('div');
        containerLeftColumn.classList.add("container-left-column");

        const containerRightColumn = document.createElement('div');
        containerRightColumn.classList.add("container-right-column");

        bookLibrary.appendChild(bookLink)
        bookLink.appendChild(bookContainer)
        bookContainer.appendChild(containerLeftColumn);
        bookContainer.appendChild(containerRightColumn);


        // Book Container Elements
        const bookTitle = document.createElement('h5');
        bookTitle.classList.add("mb-1", "book-title");
        bookTitle.textContent = library[i].title;

        const daysCreated =  document.createElement('small');
        daysCreated.classList.add("days-created");
        daysCreated.textContent = `${library[i].daysCreated} days ago`;

        const pages = document.createElement('small');
        pages.classList.add("number-pages");
        pages.textContent = `${library[i].pages} pages`

        const bookAuthor = document.createElement('p');
        bookAuthor.classList.add("mb-1", "book-author");
        bookAuthor.textContent = library[i].author;

        const bookGenre = document.createElement('small');
        bookGenre.classList.add('book-genre');
        bookGenre.textContent = library[i].genre

        const deleteButton = document.createElement('button');
        // deleteButton.setAttribute('id', deleteButoon)
        deleteButton.style.display = 'inline';
        deleteButton.classList.add("btn-danger")
        deleteButton.textContent = "Delete"

        deleteButton.addEventListener('click', () => deleteBook(library[i].id));

        containerLeftColumn.appendChild(bookTitle);
        containerLeftColumn.appendChild(bookAuthor);
        containerLeftColumn.appendChild(bookGenre);
        containerLeftColumn.appendChild(pages);

        containerRightColumn.appendChild(daysCreated)
        containerRightColumn.appendChild(deleteButton)
        
    }
    console.log(library)
}

const bookDialog = document.getElementById("addBookDialog");
let showDialogButton = true;

function showDialog() {
    const button =  document.getElementById("addBookButton");
    const rect = button.getBoundingClientRect(); // getBoundingClientRect() returns the position of the button in the viewport

    bookDialog.style.position = "absolute";
    bookDialog.style.top = `${rect.bottom + window.scrollY + 10}px`

    if (showDialogButton) {
        bookDialog.show()
    } else {
        bookDialog.close()
    }

    showDialogButton = !showDialogButton
    
}

function submitBookData() {
    let bookForm = document.getElementById("bookForm");
    if (!bookForm.hasListener) { // Add a custom flag to check if the listener exists
        bookForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let inputBookTitle = document.getElementById("inputBookTitle");
            let inputBookAuthor = document.getElementById("inputBookAuthor");
            let inputBookGenre = document.getElementById("inputBookGenre");
            let inputBookPages = document.getElementById("inputBookPages");
    
            addBookToLibrary(inputBookTitle.value, inputBookAuthor.value, inputBookGenre.value, inputBookPages.value)
    
            renderLibrary(myLibrary);
    
            bookForm.reset();
    
            showDialogButton = !showDialogButton
    
            bookDialog.close();

        });
        bookForm.hasListener = true;
    }
}

function deleteBook(id) {
    myLibrary.splice(id, 1)
    renderLibrary(myLibrary);
    showDialog(); // This will close back the dialog
}



renderLibrary(myLibrary);