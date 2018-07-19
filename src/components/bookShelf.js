import React, { Component } from 'react'
import Book from './book'

class BookShelf extends Component {
    
    render() {
        
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.propsTitle}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {this.props.books.map(book => <Book onChangeShelf={this.props.onChangeShelf} key={book.id} item={book} />)}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookShelf