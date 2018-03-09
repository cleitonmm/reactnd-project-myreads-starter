import React, { Component } from "react";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

class SearchBooks extends Component {
  static propsTypes = {
    changeShelf: PropTypes.func.isRequired,
    booksOnShelf: PropTypes.array
  };

  state = {
    query: "",
    prevQuery: "",
    foundBooks: []
  };

  shouldComponentUpdate(nextProps, nextStates) {
    if (nextStates.query === nextStates.prevQuery) return true;
    else return false;
  }

  searchBook = query => {
    let prevQuery = query;
    this.setState({ query, prevQuery });
    if (query) {
      BooksAPI.search(query)
        .then(foundBooks => {
          if (Object.prototype.toString.call(foundBooks) !== Object.prototype.toString.call(this.state.foundBooks)) foundBooks = []
          this.setState({ foundBooks, prevQuery });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({ foundBooks: [] });
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.searchBook(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
         <BookShelf 
             books={this.state.foundBooks} 
             changeShelf={(book) => this.props.changeShelf(book)}/>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
