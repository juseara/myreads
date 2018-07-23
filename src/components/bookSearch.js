import React, { Component } from 'react'
import { search } from '../BooksAPI'
import BookShelf from './bookShelf'


const merge = (a, b, p) => a.filter( aa => b.find ( bb => aa[p] !== bb[p]) ).concat(b)
class BookSearch extends Component {
    constructor(props)
    {
        super(props)

        this.fetchSearch = this.fetchSearch.bind(this)
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

    
    fetchSearch(e)
    {
        
        this.setState({term:e.target.value})
        setTimeout(() => {
            search(this.state.term).then(resp=>{
                if(resp && resp.length > 0){

                    const resultado = resp.map(item=>{

                        if(this.props.list.find(book=>book.id === item.id))
                        {
                            return this.props.list.find(book=>book.id === item.id)
                        }
                        return item
                    })
                        this.setState({list:resultado})
                }
                else{
                    this.setState({list:[],notResult:true})
                }
            })
        }, 1000);
    }

    

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={this.props.onReturnList}>Close</a>
                    <div className="search-books-input-wrapper">
                       
                        <input type="text"  value={this.state.term} onChange={this.fetchSearch} placeholder="Search by title or author" />

                    </div>
                </div>
                <div className="search-books-results">
                    <BookShelf title={`Serch of ${this.state.term}`} onChangeShelf={this.props.onChangeShelf} books={this.state.list}/>
                    {(this.state.notResult) && <h2>Sem resultados para {this.state.term}</h2>}
                </div>
            </div>
        )
    }
}

export default BookSearch