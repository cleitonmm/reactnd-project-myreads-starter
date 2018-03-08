import React from "react";
import "./App.css";
import BookShelf from "./BookShelf";
import SearchBooks from './SearchBooks'
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books });
      })
      .catch(err => {
        console.log(err);
      });
  }

  changeShelf = bookChanged => {
    let books = this.state.books
      .filter(book => book.id !== bookChanged.id)
      .concat({
        ...bookChanged,
        shelf: bookChanged.shelf
      });
    BooksAPI.update(bookChanged, bookChanged.shelf)
      .then(this.setState({ books }))
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const bookShelfs = [
      { id: "currentlyReading", title: "Currently Reading" },
      { id: "wantToRead", title: "Want to Read" },
      { id: "read", title: "Read" }
    ];

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks changeShelf={book => this.changeShelf(book)}/>  
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {bookShelfs.map(shelf => (
                  <BookShelf
                    key={shelf.id}
                    books={this.state.books.filter(
                      book => book.shelf === shelf.id
                    )}
                    title={shelf.title}
                    changeShelf={book => this.changeShelf(book)}
                  />
                ))}
              </div>
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>
                  Add a book
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
