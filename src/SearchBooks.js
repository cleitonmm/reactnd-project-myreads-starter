import React, { Component } from "react";
import PropTypes from "prop-types";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class SearchBooks extends Component {
  static propsTypes = {
    booksOnShelf: PropTypes.array.isRequired
  };

  state = {
    query: "",
    prevQuery: "",
    foundBooks: []
  };

  /*TODO:  Previnir que ao apagar rapidamente a pesquisa mostre resultados inválidos
   *Exemplo: se apagar rapidamente a promise BooksAPI.Search poderá retornar resultados
   *         de uma execução anterior já que o campo de pesquisa vazio não executa novamente a promise
   */
  shouldComponentUpdate(nextProps, nextStates) {
    if (nextStates.query === nextStates.prevQuery) return true;
    return false;
  }

  searchBook = query => {
    let prevQuery = query;
    this.setState({ query, prevQuery, updade: true });
    if (query) {
      BooksAPI.search(query)
        .then(foundBooks => {
          if (
            Object.prototype.toString.call(foundBooks) !==
            Object.prototype.toString.call(this.state.foundBooks)
          )
            foundBooks = [];
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
          <Link className="close-search" to="/">
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
            booksOnShelf={this.props.booksOnShelf}
          />
        </div>
      </div>
    );
  }
}

export default SearchBooks;
