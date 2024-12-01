const myLibrary = [];

function Book(id, title, author, genre, daysCreated) {

    this.title = title;
    this.author = author;
    this.genre = genre;
    this.daysCreated = daysCreated

}

function addBookToLibrary(title, author, genre, daysCreated=0) {
    bookName = new Book(`bookName ${myLibrary.length}`, title, author, genre, daysCreated)
    myLibrary.push(bookName)

}

addBookToLibrary("The Lost Horizon", "James Hilton", "Adventure", 3);
addBookToLibrary("Celestial Stories", "Aria Moon", "Fantasy", 3);
addBookToLibrary("Deep Space Journey", "Liam Vega", "Science Fiction", 3);

// addBookToLibrary("Mystery at Midnight", "Ella Greene", "Mystery");
// addBookToLibrary("Whispers of Wisdom", "Sophia Brooks", "Self-Help");

{/* <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">The Lost Horizon</h5>
      <small>3 days ago</small>
    </div>
    <p class="mb-1">James Hilton</p>
    <small>Adventure</small>
  </a> */}

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

        const bookContainer = document.createElement('div');
        bookContainer.classList.add("d-flex", "w-100", "justify-content-between");

        const bookTitle = document.createElement('h5');
        bookTitle.classList.add("mb-1", "book-title");
        bookTitle.textContent = library[i].title;

        const daysCreated =  document.createElement('small');
        daysCreated.classList.add("days-created");
        daysCreated.textContent = `${library[i].daysCreated} days ago`;

        const bookAuthor = document.createElement('p');
        bookAuthor.classList.add("mb-1", "book-author");
        bookAuthor.textContent = library[i].author;

        const bookGenre = document.createElement('small');
        bookGenre.classList.add('book-genre');
        bookGenre.textContent = library[i].genre

        bookContainer.appendChild(bookTitle)
        bookContainer.appendChild(daysCreated)
        bookLink.appendChild(bookContainer)
        bookLink.appendChild(bookAuthor)
        bookLink.appendChild(bookGenre)
        bookLibrary.appendChild(bookLink)
    }
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
    bookForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("This")
        let inputBookTitle = document.getElementById("inputBookTitle");
        let inputBookAuthor = document.getElementById("inputBookAuthor");
        let inputBookGenre = document.getElementById("inputBookGenre");

        addBookToLibrary(inputBookTitle.value, inputBookAuthor.value, inputBookGenre.value)

        renderLibrary(myLibrary);

        bookForm.reset();

        showDialogButton = !showDialogButton

        bookDialog.close();
    })
}



renderLibrary(myLibrary);