import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
            list: []
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
                if(resp.length > 0){

                    const resultado = resp.filter(item=> !this.props.list.find(book => book.id === item.id))
                    .concat(this.props.list.filter(book=> resp.find(item=>item.id === book.id))).sort(function(a,b){
                        if(a.name > b.name){
                            return -1
                        }
                        else{
                            return 1
                        }
                        return 0
                    })
                        this.setState({list:resultado})
                }
                else{
                    this.setState({list:[]})
                }
            })
        }, 1000);
    }

    

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search" onClick={this.props.onReturnList}>Close</Link>
                    <div className="search-books-input-wrapper">
                       
                        <input type="text"  value={this.state.term} onChange={this.fetchSearch} placeholder="Search by title or author" />

                    </div>
                </div>
                <div className="search-books-results">
                    <BookShelf title={`Serch of ${this.state.term}`} onChangeShelf={this.props.onChangeShelf} books={this.state.list}/>
                </div>
            </div>
        )
    }
}

export default BookSearch