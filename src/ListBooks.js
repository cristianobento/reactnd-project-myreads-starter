import React, { Component } from "react";
import Bookshelf from "./Bookshelf";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

export default class ListBooks extends Component {
  constructor() {
    super();
    this.state = {
      books: []
    };
    this.handleBookUpdate = this.handleBookUpdate.bind(this);
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getBookById = id => {
    BooksAPI.get(id).then(book => {
      return book;
    });
  };

  getAllBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState({
        books
      });
    });
  };

  handleBookUpdate() {
    this.getAllBooks();
  }

  render() {
    let currReadingList = [];
    let wantToReadList = [];
    let readList = [];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {this.state.books.forEach(book => {
            if (book.shelf === "currentlyReading") {
              currReadingList.push(book);
            } else if (book.shelf === "wantToRead") {
              wantToReadList.push(book);
            } else if (book.shelf === "read") {
              readList.push(book);
            }
          })}

          <Bookshelf
            handleBookUpdate={this.handleBookUpdate}
            category="Currently Reading"
            books={currReadingList}
          />
          <Bookshelf
            handleBookUpdate={this.handleBookUpdate}
            category="Want to Read"
            books={wantToReadList}
          />
          <Bookshelf
            handleBookUpdate={this.handleBookUpdate}
            category="Read"
            books={readList}
          />
        </div>

        <div className="open-search">
          <Link to="/search" className="add-book">
            Add a book{" "}
          </Link>
        </div>
      </div>
    );
  }
}
