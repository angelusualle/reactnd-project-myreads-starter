import React from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'

class Search extends React.Component {
  state = {
    searchTerm: '',
    results: []
  }

  moveBook(b, v) {
    this.props.move(b, v);
    this.setState((oldState) => ({results: oldState.results.map(
      (book) => {
        if (book.id === b.id){
          book.shelf = v;
        }
        return book;
        }
    )}))
  }
  updateSearchTerm(searchTerm){
    if (searchTerm.length === 0){
      this.setState({results: []});
      return;
    }
    let searchComponent = this;
    BooksAPI.search(searchTerm).then((results) => {
      if (!Array.isArray(results)){
        results = [];
      }
      this.setState({searchTerm:searchTerm, results: results.map(
        (book) => {
          let shelf = searchComponent.props.books.find(b => b.id === book.id) ?  searchComponent.props.books.find(b => b.id === book.id).shelf : 'none';
          book.shelf = shelf;
          return book;
          }
      )})
    });
  }
  render() {
    let currentlyReading  = this.state.results.filter((book) => book.shelf === 'currentlyReading');
    let wantToRead = this.state.results.filter((book) => book.shelf === 'wantToRead');
    let read = this.state.results.filter((book) => book.shelf === 'read');
    let none = this.state.results.filter((book) => book.shelf === 'none');
    return (
        <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.props.navigate(false)}>Close</a>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onChange={(e) => this.updateSearchTerm(e.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
            <Shelf books={currentlyReading} title='Currently Reading' move={(b, v) => this.moveBook(b,v)}/>
            <Shelf books={wantToRead} title='Want to Read' move={(b, v) => this.moveBook(b,v)}/>
            <Shelf books={read} title='Read' move={(b, v)  => this.moveBook(b,v)}/>
            <Shelf books={none} title='None' move={(b, v)  => this.moveBook(b,v)}/>
        </div>
      </div>
    )
  }
}

export default Search
