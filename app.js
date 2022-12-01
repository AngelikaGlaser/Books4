const formEl = document.querySelector('#add-book')
formEl.addEventListener('submit', addBook)
const booksrow = document.querySelector('#table')
booksrow.addEventListener('click', deleteBook)
//document.addEventListener('DOMContentLoaded', getBooksFromLS)

function addBook(event) {

    //get the different input values
    const TitleInPut = document.querySelector('#title')
    const AuthorInPut = document.querySelector('#author')
    const ISBNInPut = document.querySelector('#ISBN')

    //add the input values + deletebutton to the table
    const TableData = `<tr>
                        <td>${TitleInPut.value}</td>
                        <td>${AuthorInPut.value}</td>
                        <td>${ISBNInPut.value}</td>
                        <td><a href="#" class="secondary-content">X</a></td>
                   </tr>`
    // save books value to LS
    AddBooksToLS(TitleInPut.value, AuthorInPut.value, ISBNInPut.value)

    //delete input value from input fields
    TitleInPut.value = ''
    AuthorInPut.value = ''
    ISBNInPut.value = ''
    event.preventDefault()

   document.getElementById('table').innerHTML += TableData;
}

function deleteBook(event) {
    if (event.target.classList.contains('secondary-content')) {
        if (confirm('Do you really want to delete this?')) {
            event.target.closest('tr').remove()
            let book_target = event.target.parentElement.parentElement.textContent.split('\n').map(elem => elem.trim())
            let book_array = Array.from(book_target).filter(elm => elm)
            let book = book_array[0]
            deleteBooksFromLS(book)
        }
    }
}

function AddBooksToLS(title, author, isbn){
    let books
    if(localStorage.getItem('books') === null){
        books = []
    } else {
        books = JSON.parse(localStorage.getItem('books'))
    }
    books.push([title, author, isbn])
    localStorage.setItem('books', JSON.stringify(books))
}

function deleteBooksFromLS(book) {
    let books
    if (localStorage.getItem('books') === null) {
        books = []
    } else {
        books = JSON.parse(localStorage.getItem('books'))
    }
    books.forEach((bookFromLS, index) => {
        if (bookFromLS[0] === book){
            books.splice(index, 1)
        }
    localStorage.setItem('books', JSON.stringify(books))
    })
}
