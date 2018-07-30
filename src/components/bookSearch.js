import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { search } from '../BooksAPI'
import BookShelf from './bookShelf'
import { debounce } from 'lodash'
class BookSearch extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            term:'',
            list: [],
            notResult:false
        }
        
    }
    
    componentWillUnmount()
    {
        this.setState({list:[],term:''})
    }

    
    handlerSearch = debounce((value) =>
    {
       this.setState({term:value})

       search(this.state.term).then(resp=>{
           if(resp && resp.length > 0){

               const resultado = resp.map(item=>{

                   if(this.props.list.find(book=>book.id === item.id))
                   {
                       return this.props.list.find(book=>book.id === item.id)
                   }
                   return item
               })
                   this.setState({list:resultado,notResult:false})
           }
           else{
               this.setState({list:[],notResult:true})
           }
       })
    },500)

    

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search" onClick={this.props.onReturnList}>Close</Link>
                    <div className="search-books-input-wrapper">
                       
                        <input type="text"  onChange={e => this.handlerSearch(e.target.value)} placeholder="Search by title or author" />

                    </div>
                </div>
                <div className="search-books-results">
                    <BookShelf title={`Serch of ${this.state.term}`} onChangeShelf={this.props.onChangeShelf} books={this.state.list}/>
                    {(this.state.notResult && this.state.term) && <h2>Sem resultados para {this.state.term}</h2>}
                </div>
            </div>
        )
    }
}

export default BookSearch