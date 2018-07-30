import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import BookList from './components/bookList'
import BookSearch from './components/bookSearch'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import { getAll, update } from './BooksAPI'

class BooksApp extends React.Component {

  constructor(props) {
    super(props)
    this.changeShelf = this.changeShelf.bind(this)
  }

  state = {
    list: [],
    showSearchPage: false
  }

  async componentDidMount() {
    const books = await getAll()
    this.setState({list:books})
  }

  chageSearchPageHandler(change) {
    this.setState({ showSearchPage: change })
  }
  
  changeShelf(aValue,aShelf) {
    const book = {...aValue,shelf:aShelf}
    update(aValue,aShelf)
    this.setState(state => {
      return { list: state.list.filter(item => item.id !== book.id).concat(book) }
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

export default DragDropContext(HTML5Backend)(BooksApp)
