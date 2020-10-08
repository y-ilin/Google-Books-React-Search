import React, { useState, useEffect } from "react";
import "./style.css";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
// import ListGroup from "react-bootstrap/ListGroup";
import Book from "../Book";
import Button from "react-bootstrap/Button";

function SavedBooks() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res => {
        console.log(res.data)
        setBooks(res.data)
      })
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  return (
    <div>
      {books.length ? (
        <ul>
          {books.map(book => (
            <Book 
                key={book._id}
                id={book._id}
                title={book.title}
                authors={book.authors}
                image={book.image}
                description={book.description}
                infoLink={book.link}
                bookInfo={book}
                deleteBook={deleteBook}
                // id={book._id}
            />
          ))}
        </ul>
      ) : (
        <h3>No Results to Display</h3>
      )}
    </div>
  );
}

export default SavedBooks;
