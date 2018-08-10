import React from 'react'

class Shelf extends React.Component {
  render() {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.title}</h2>
            <div className="bookshelf-books">
            <ol className="books-grid"> 
            {this.props.books.map((book) => 
                    <li key={book.id}>
                        <div className="book">
                        <div className="book-top">
                            { (book.imageLinks && book.imageLinks.thumbnail) ?
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                            : ''
                            }
                            <div className="book-shelf-changer">
                            <select defaultValue='move' onChange ={(e) => this.props.move(book, e.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading" style={book.shelf === 'currentlyReading'? {display:'none'}: {display:'block'}}>Currently Reading</option>
                                <option value="wantToRead" style={book.shelf === 'wantToRead'? {display:'none'}: {display:'block'}}>Want to Read</option>
                                <option value="read" style={book.shelf === 'read'? {display:'none'}: {display:'block'}}>Read</option>
                                <option value="none"  style={book.shelf === 'none'? {display:'none'}: {display:'block'}}>None</option>
                            </select>
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        { book.authors ? <div className="book-authors">{book.authors[0]} </div> : ''}
                        </div>
                    </li>
                )}
            </ol>
            </div>
        </div>)
  }
}

export default Shelf
