import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './bookShelf'
class BookList extends Component {

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf shelf="currentlyReading" title='Currenty Reading' onChangeShelf={this.props.onChangeShelf} books={this.props.list.filter(book => book.shelf === 'currentlyReading')} />
            <BookShelf shelf="wantToRead" title='Want to Read' onChangeShelf={this.props.onChangeShelf} books={this.props.list.filter(book => book.shelf === 'wantToRead')} />
            <BookShelf shelf="read" title='Read' onChangeShelf={this.props.onChangeShelf} books={this.props.list.filter(book => book.shelf === 'read')} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" onClick={this.props.onGotoSearch}>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookList