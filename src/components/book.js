import React, { Component } from 'react'
import { update } from '../BooksAPI'
class Book extends Component {
    constructor(props){
        super(props)
        this.onUpdateShelf = this.onUpdateShelf.bind(this)
        
    }

   
    onUpdateShelf(e)
    {
        this.props.onChangeShelf({...this.props.item,shelf:e.target.value})
        update(this.props.item,e.target.value)
        
    }

    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${this.props.item.imageLinks.thumbnail}")` }}></div>
                        <div className="book-shelf-changer">
                            <select defaultValue={this.props.item.shelf?this.props.item.shelf:'none'} 
                                onChange={this.onUpdateShelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select> 
                        </div>
                    </div>
                    <div className="book-title">{ this.props.item.title }</div>
                    <div className="book-authors">{ this.props.item.authors}</div>
                </div>
            </li>
        )
    }
}

export default Book