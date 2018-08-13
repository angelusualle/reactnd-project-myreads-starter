import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Search from './Search'
import {Link} from 'react-router-dom'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
  }
  componentDidMount(){
    BooksAPI.getAll().then((books) => this.setState({ books: this.state.books.concat(books)}));
  }

  moveBook(book, value) {
    BooksAPI.update(book, value).then((r) =>{
      this.setState((oldState) => ({
        books : oldState.books.map(b => {
          if (b.id === book.id) {
            b.shelf = value;
          }
          return b;
        })
      }))
    })
  }

  render() {
    let currentlyReading  = this.state.books.filter((book) => book.shelf === 'currentlyReading');
    let wantToRead = this.state.books.filter((book) => book.shelf === 'wantToRead');
    let read = this.state.books.filter((book) => book.shelf === 'read');
    return (
      <div className="app">
        <Route exact path="/" render={() => 
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf books={currentlyReading} title="Currently Reading" move={(book, value) => this.moveBook(book, value)}/>
                <Shelf books={wantToRead} title="Want to Read" move={(book, value) => this.moveBook(book, value)}/>
                <Shelf books={read} title="Read" move={(book, value) => this.moveBook(book, value)}/>
              </div>
            </div>
            <div className="open-search">
            <Link to={{
            pathname: "/search"
            }}>Add a book</Link>
            </div>
          </div>
          } />
        <Route path="/search" render={ () => 
          <Search books={this.state.books} move={(book, value) => this.moveBook(book, value)}/>
        }/>
      </div>
    )
  }
}

export default BooksApp
