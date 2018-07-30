import React, { PureComponent } from 'react'
import { DragSource } from 'react-dnd';
const imageNotFound = require('../assets/image/not-found.png')
const bookSource = {
    beginDrag(props){
        return props.item
    },
    
    endDrag(props,monitor,PureComponent){
        
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
    
class Book extends PureComponent {
    
    render() {
        const {isDragging,connectDragSource, item } = this.props
        const opacty = isDragging ? 0 : 1
        const thumbnail = item.imageLinks ? item.imageLinks.smallThumbnail || item.imageLinks.thumbnail : imageNotFound
        return connectDragSource(
            <li>
                <div className="book" style={{opacity:opacty}}>
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${thumbnail}")` }}></div>
                        <div className="book-shelf-changer">
                            <select defaultValue={item.shelf ? item.shelf:'none'} 
                                onChange={(e) => this.props.onChangeShelf(this.props.item,e.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select> 
                        </div>
                    </div>
                    <div className="book-title">{ item.title || 'No title' }</div>
                    <div className="book-authors">{ item.authors || 'no authors'}</div>
                </div>
            </li>
        )
    }
}

export default DragSource('book', bookSource, collect)(Book)