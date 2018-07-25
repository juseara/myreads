import React, { Component } from 'react'
import Book from './book'
import { DropTarget } from 'react-dnd';

function collect(connect,monitor){
    return{
        connectDropTarget:connect.dropTarget(),
        hovered:monitor.isOver(),
        isHoveredCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        item: monitor.getItem()
    }
}

const chessSquareTarget = {
    canDrop(props, monitor) {
      const item = monitor.getItem();
      return item
    },
  
    drop(props, monitor) {
      
      const item = monitor.getItem();
      
      if(props.shelf !== item.shelf && props.shelf !== undefined){
        props.onChangeShelf(item,props.shelf)
      }
    }
  };

class BookShelf extends Component {

    
    render() {
        const { connectDropTarget, hovered } = this.props
        const  backGroundColor = hovered ? 'lightgrey':'white'
        return connectDropTarget(
            <div >
               {this.props.books.length > 0 && <div style={{background:backGroundColor}} className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.title}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {this.props.books.map(book => <Book onChangeShelf={this.props.onChangeShelf} key={book.id} item={book} />)}
                        </ol>
                    </div>
                </div>}
            </div>
        )
    }
}

export default DropTarget('book', chessSquareTarget, collect)(BookShelf)