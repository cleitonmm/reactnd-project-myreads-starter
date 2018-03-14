import React, { Component } from "react";
import PropTypes from "prop-types";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import debounce from "lodash/debounce";

class SearchBooks extends Component {
  static propsTypes = {
    booksOnShelf: PropTypes.array.isRequired
  };

  state = {
    query: "",
    foundBooks: []
  };

  searchBook (query)  {
    if (query) {
      BooksAPI.search(query)
        .then(foundBooks => {
          if (
            Object.prototype.toString.call(foundBooks) !==
            Object.prototype.toString.call(this.state.foundBooks)
          )
            foundBooks = [];
          if (query === this.state.query) this.setState({ foundBooks });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({ foundBooks: [] });
    }
  };

  debounceSearchBook = debounce(this.searchBook, 300)

  handleInpuChange = query => {
    this.setState({ query });
    this.debounceSearchBook(query)
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to={{ pathname: "/", state: { coisa: "coisa" } }}
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.handleInpuChange(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BookShelf
            books={this.state.foundBooks}
            booksOnShelf={this.props.booksOnShelf}
          />
        </div>
      </div>
    );
  }
}

export default SearchBooks;
