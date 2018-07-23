import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import BookList from './components/bookList'
import BookSearch from './components/bookSearch'

import { getAll } from './BooksAPI'

class BooksApp extends React.Component {

  constructor(props) {
    super(props)
    this.changeShelf = this.changeShelf.bind(this)
  }

  state = {
    list: [],
    showSearchPage: false
  }

  componentDidMount() {
    this.fetchBooks()
  }

  chageSearchPageHandler(change) {
    this.setState({ showSearchPage: change })
  }

  fetchBooks() {
    getAll().then(data => this.setState({ list: data }))
  }

  changeShelf(value) {
    this.setState(state => {
      return { list: state.list.filter(item => item.id !== value.id).concat(value) }
    })

  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList onChangeShelf={this.changeShelf} list={this.state.list} onGotoSearch={() => this.chageSearchPageHandler(true)} />
        )} />
        <Route path="/search" render={() => (
          <BookSearch onChangeShelf={this.changeShelf} list={this.state.list} onReturnList={() => this.chageSearchPageHandler(false)} />
        )} />
      </div>
    )
  }
}

export default BooksApp
