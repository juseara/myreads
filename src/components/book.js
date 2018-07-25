import React, { Component } from 'react'
import { DragSource } from 'react-dnd';

const bookSource = {
    beginDrag(props){
        return props.item
    },
    
    endDrag(props,monitor,component){
        
        if(!monitor.didDrop())
        {
            return
        }
        return props.item
    }
}
function collect(connect,monitor){
    return{
        connectDragSource:connect.dragSource(),
        connectDragPreview:connect.dragPreview(),
        isDragging:monitor.isDragging()
    }
}
class Book extends Component {
    constructor(props){
        super(props)
        this.onUpdateShelf = this.onUpdateShelf.bind(this)
        
    }

   
    onUpdateShelf(e)
    {
        this.props.onChangeShelf(this.props.item,e.target.value)
    }

    render() {
        const {isDragging,connectDragSource, item } = this.props
        const opacty = isDragging ? 0 : 1
        return connectDragSource(
            <li>
                <div className="book" style={{opacity:opacty}}>
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${item.imageLinks.thumbnail}")` }}></div>
                        <div className="book-shelf-changer">
                            <select defaultValue={item.shelf ? item.shelf:'none'} 
                                onChange={this.onUpdateShelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select> 
                        </div>
                    </div>
                    <div className="book-title">{ item.title }</div>
                    <div className="book-authors">{ item.authors}</div>
                </div>
            </li>
        )
    }
}

export default DragSource('book', bookSource, collect)(Book)