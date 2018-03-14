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

  getMyBooks = () => {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books });
      })
      .catch(err => {
        console.log(err);
      });
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
          render={() => <MyReads books={this.state.books} getMyBooks={this.getMyBooks}/>}
        />
      </div>
    );
  }
}

export default BooksApp;
