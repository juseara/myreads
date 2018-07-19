import React, { Component } from 'react'
import { getAll } from '../BooksAPI'
import BookShelf from './bookShelf'
class BookList extends Component {

  constructor(props){
    super(props)
    this.changeShelf = this.changeShelf.bind(this)
  }
  state = {
    list: []
  }

  componentWillMount() {

    console.log("Will Mount")

  }

  componentDidMount() {
    this.fetchBooks()
    console.log("Did Mount")
  }

  fetchBooks() {
    getAll().then(data => this.setState({ list: data }))
  }

  changeShelf(value) {
    console.log("change shelf: ", value)
    console.log("this state: ", this.state.list)
    this.setState(state => {
      
      console.log("state: ",state.list)
      return { list: state.list.filter(item => item.id !== value.id).concat(value)}
    })

  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf title='Currenty Reading' onChangeShelf={this.changeShelf} books={this.state.list.filter(book => book.shelf === 'currentlyReading')} />
            <BookShelf title='Want to Read' onChangeShelf={this.changeShelf} books={this.state.list.filter(book => book.shelf === 'wantToRead')} />
            <BookShelf title='Read' onChangeShelf={this.changeShelf} books={this.state.list.filter(book => book.shelf === 'read' || book.shelf === 'none')} />
          </div>
        </div>
        <div className="open-search">
          <a onClick={this.props.onGotoSearch}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default BookList