import React from "react";
import BookshelfChanger from "./BookshelfChanger";
import PropTypes from "prop-types";

const Book = props => (
  <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{ width: 128, height: 193, backgroundImage: props.url }}
      />

      <div className="book-shelf-changer">
        <BookshelfChanger
          handleBookUpdate={props.handleBookUpdate}
          book={props.book}
        />
      </div>
    </div>
    <div className="book-title">{props.title}</div>
    <div className="book-authors">{props.authors}</div>
  </div>
);

Book.propTypes = {
  handleBookUpdate: PropTypes.func,
  book: PropTypes.object
};

export default Book;
