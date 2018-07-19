import React, { Component } from 'react'

class Book extends Component {
    
    componentWillMount(){
        this.setState({book:this.props.item})
    }
    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${this.props.item.imageLinks.thumbnail}")` }}></div>
                        <div className="book-shelf-changer">
                            <select defaultValue={this.props.item.shelf}
                                onChange={(e)=> this.props.onChangeShelf({...this.props.item,shelf:e.target.value})}>
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