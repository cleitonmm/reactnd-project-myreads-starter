import React, { Component } from "react";
import Book from "./Book";
import PropTypes from "prop-types";

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string,
    changeShelf: PropTypes.func.isRequired
  };

  render() {
    let books = (
      <ol className="books-grid">
        {this.props.books.map(book => (
          <li key={book.id}>
            <Book
              book={book}
              changeShelf={book => this.props.changeShelf(book)}
            />
          </li>
        ))}
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
