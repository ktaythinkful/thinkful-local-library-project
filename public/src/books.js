function findAuthorById(authors, id) {
    return authors.find(author => author.id == id)
}

function findBookById(books, id) {
    return books.find(({ id: bookID }) => id == bookID)
}

function getBorrowersForBook(book, accounts) {
    const { borrows: borrowList } = book
    let borrowers = []

    accounts.forEach(account => {
        borrowList.forEach(({ id, returned }) => {
            if (id == account.id) borrowers.push({ ...account, returned })
        })
    })
    return borrowers.slice(0, 10)
}

function partitionBooksByBorrowedStatus(books) {
    const checkedOut = books.filter(({ borrows: [{ returned }] }) => !returned)
    const returned = books.filter(({ borrows: [{ returned }] }) => returned)
    return [checkedOut, returned]
}


module.exports = {
    findAuthorById,
    findBookById,
    partitionBooksByBorrowedStatus,
    getBorrowersForBook,
}