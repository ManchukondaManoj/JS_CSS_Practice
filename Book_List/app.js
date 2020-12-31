//Book Class

class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    static displayBooks(){
        const storedBooks = [
            {
                title: 'Book One',
                author: 'John Doe',
                isbn: '343434'
            },
            {
                title: 'Book two',
                author: 'Jane Doe',
                isbn: '454545'
            },
        ]
        const books = storedBooks;
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href='#' class='btn btn-danger btn-sm delete'>X</a></td>
        `
        list.appendChild(row);
    }

    static clearFields(){
        document.querySelector("#title").value = ''
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            const parentElement = el.parentElement.parentElement;
            const bookName = parentElement.getElementsByTagName('td')[0].innerHTML;
            parentElement.remove();
            UI.showAlert(`Book ${bookName} removed`, 'success');
        }
    }

    static showAlert(message, className) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${className}`;
        alertDiv.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(alertDiv, form)

        //Vanish in three seconds

        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    if( title === '' || author === '' || isbn === ''){
        UI.showAlert('Please fill all fields', 'danger');
    } else {
        const book = new Book(title, author, isbn);
        
        UI.addBookToList(book);
        
        UI.showAlert(`Book ${book.title} added`, 'success');

        //clear fields
        UI.clearFields();
    }
});

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
})