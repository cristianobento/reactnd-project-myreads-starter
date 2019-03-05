import React, { Component } from "react";
import PropTypes from "prop-types";
import Bookshelf from "./Bookshelf";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

export default class ListBooks extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      currentlyReading:[],
      wantToRead:[],
      read:[],

    }
  }

  componentDidMount() {
    BooksAPI.getAll().then(result => {
      let curr = [];
      let want = [];
      let read = [];

      result.forEach((book)=> {
        if(book.shelf === 'currentlyReading'){
          curr.push(book)
        }
        if(book.shelf === 'wantToRead'){
          want.push(book)
        }
        if(book.shelf === 'read'){
          read.push(book)
        }
      })

      this.setState((currentState) => ({
        currentlyReading: curr,
        wantToRead: want,
        read: read,
      }));
    });
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Bookshelf category="Currently Reading" books={this.state.currentlyReading}/>
          <Bookshelf category="Want to Read" books={this.state.wantToRead}/>
          <Bookshelf category="Read "books={this.state.read}/>
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
