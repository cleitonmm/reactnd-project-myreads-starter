import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import SearchBooks from "./SearchBooks";
import * as BooksAPI from "./BooksAPI";
import MyReads from "./MyReads";

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
    return (
      <div className="app">
        <Route
          path="/search"
          component={() => (
            <SearchBooks 
              changeShelf={book => this.changeShelf(book)} 
              booksOnShelf={this.state.books}
            />
          )}
        />

        <Route
          exact path="/"
          component={() => (
            <MyReads
              changeShelf={book => this.changeShelf(book)}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
