import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelfChanger extends Component {
    static propTypes = {
        shelf: PropTypes.string,
        changeShelf:  PropTypes.func.isRequired,
        booksOnShelf: PropTypes.array
    }

    static defaultProps = {
        shelf: 'none'
    }

    render() {
        return <div className="book-shelf-changer">
        <select value={this.props.shelf} onChange={(event) => this.props.changeShelf(event.target.value)}>
          <option value="null" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    }
}

export default BookShelfChanger;