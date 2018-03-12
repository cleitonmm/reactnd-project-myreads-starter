import React, { Component } from "react";
import Book from "./Book";
import PropTypes from "prop-types";

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string,
    updateShelf: PropTypes.func
  };

  static defaultProps = {
    updateShelf: () => null
  };

  render() {
    let books = (
      <ol className="books-grid">
        {this.props.books.map(book => {
          if (this.props.booksOnShelf)
            this.props.booksOnShelf
              .filter(bos => bos.id === book.id)
              .map(bos => (book.shelf = bos.shelf));
          return (
            <li key={book.id}>
              <Book
                book={book}
                updateShelf={book => this.props.updateShelf(book)}
              />
            </li>
          );
        })}
      </ol>
    );
    return (
      <div>
        {this.props.title ? (
          <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.title}</h2>
            <div className="bookshelf-books">{books} </div>
          </div>
        ) : (
          books
        )}
      </div>
    );
  }
}

export default BookShelf;
