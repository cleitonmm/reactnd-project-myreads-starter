import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import SearchBooks from "./SearchBooks";
import * as BooksAPI from "./BooksAPI";
import MyReads from "./MyReads";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  async getMyBooks() {
    const books = await BooksAPI.getAll();
    this.setState({ books })
  }

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={props => <SearchBooks booksOnShelf={this.state.books} />}
        />

        <Route
          exact
          path="/"
          render={() => (
            <MyReads books={this.state.books} getMyBooks={this.getMyBooks.bind(this)} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
