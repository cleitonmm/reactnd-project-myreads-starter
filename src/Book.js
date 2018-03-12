import React, { Component } from "react";
import BookShelfChanger from "./BookShelfChanger";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateShelf: PropTypes.func
  };

  changeShelf = newShelf => {
    const book = this.props.book;
    book.shelf = newShelf;

    BooksAPI.update(book, book.shelf)
      .then(() => {
        this.setState({ book });
        if (this.props.updateShelf) this.props.updateShelf(book);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { book } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              backgroundSize: "cover",
              height: "100%",
              width: "100%",
              backgroundImage: `url(${
                book.imageLinks ? book.imageLinks.thumbnail : ""
              })`
            }}
          />
          <BookShelfChanger
            shelf={book.shelf}
            changeShelf={value => {
              this.changeShelf(value);
            }}
          />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors.join("; ") : ""}
        </div>
      </div>
    );
  }
}

export default Book;
