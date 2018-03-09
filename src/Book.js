import React, { Component } from "react";
import BookShelfChanger from './BookShelfChanger'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
      book: PropTypes.object.isRequired,
      changeShelf: PropTypes.func.isRequired,
      booksOnShelf: PropTypes.array
  }

  changeShelf = shelf => {
      this.props.book.shelf = shelf;
      this.props.changeShelf(this.props.book)
  }

  render() {
    const { book } = this.props  
    return <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            backgroundSize: 'cover',
            height: '100%',
            width: '100%',  
            backgroundImage: `url(${book.imageLinks.thumbnail})` 
          }}
        />
        <BookShelfChanger 
            shelf={book.shelf} 
            changeShelf={(value) => {this.changeShelf(value)}}/>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors ? book.authors.join('; ') : ''}</div>
    </div>
  }
}

export default Book;
