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

  getMyBooks = () => {
    BooksAPI.getAll()
    .then(books => {
      this.setState({ books });
    })
    .catch(err => {
      console.log(err);
    });
  }

  componentDidMount() {
    this.getMyBooks()
  }

  componentWillReceiveProps() {
    this.getMyBooks()
  }

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          component={() => (
            <SearchBooks 
              booksOnShelf={this.state.books}
            />
          )}
        />

        <Route
          exact path="/"
          component={() => (
            <MyReads
              books={this.state.books}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
