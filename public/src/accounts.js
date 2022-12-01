const { findAuthorById } = require("./books");

function getTotalNumberOfBorrows(account, books) {
    let borrowedByAccount = 0
    books.filter(({ borrows }) => {
        borrows.forEach(borrow => {
            if (borrow.id == account.id) borrowedByAccount++
        })
    })
    return borrowedByAccount
}

function getBooksPossessedByAccount(account, books, authors) {
    const checkedOutByAccount = books.filter(({ borrows }) => {
        return borrows.find(({ id, returned }) => {
            return id == account.id && !returned
        })
    })

    return checkedOutByAccount.map(book => {
        return { ...book, author: findAuthorById(authors, book.authorId) }
    })
}

function findAccountById(accounts, id) {
    return accounts.find((account) => {
        return account.id == id;
    })
}

function sortAccountsByLastName(accounts) {
    return accounts.sort((a, b) => {
        return a.name.last.toLowerCase() > b.name.last.toLowerCase() ? 1 : -1
    })
}

module.exports = {
    findAccountById,
    sortAccountsByLastName,
    getTotalNumberOfBorrows,
    getBooksPossessedByAccount,
}