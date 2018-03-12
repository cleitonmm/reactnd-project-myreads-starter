import React, { Component } from "react";
import PropTypes from "prop-types";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

class MyReads extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  };

  updateShelf = book => {
    const books = this.props.books.filter(b => b.id !== book.id).concat(book);
    this.setState({ books });
  };

  render() {
    const bookShelfs = [
      { id: "currentlyReading", title: "Currently Reading" },
      { id: "wantToRead", title: "Want to Read" },
      { id: "read", title: "Read" }
    ];
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookShelfs.map(shelf => (
              <BookShelf
                key={shelf.id}
                books={this.props.books.filter(book => book.shelf === shelf.id)}
                title={shelf.title}
                updateShelf={book => this.updateShelf(book)}
              />
            ))}
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default MyReads;
