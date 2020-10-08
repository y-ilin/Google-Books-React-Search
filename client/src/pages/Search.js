import React, { useState } from "react";
import "./Search.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Banner from "../components/Banner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Book from "../components/Book";
import API from "../utils/API";


function Search() {
    // Setting our component's initial state
    const [searchList, setSearchList] = useState([]);
    const [formObject, setFormObject] = useState("");

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        setFormObject(event.target.value);
    };

    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject) {
        const queryParams = formObject;
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${queryParams}`)
            .then(res => {
                console.log(res.data.items)
                setSearchList(res.data.items)
            })
            .then(() => setFormObject(""))
            .catch(err => console.log(err))
        }
    };

    const saveBook = bookData => {
        // const id = bookData.id;
        const title = bookData.volumeInfo.title ? bookData.volumeInfo.title : "";
        const authors = bookData.volumeInfo.authors ? bookData.volumeInfo.authors : "Unknown";
        const description = bookData.volumeInfo.description ? bookData.volumeInfo.description : "";
        const image = bookData.volumeInfo.imageLinks.smallThumbnail ? bookData.volumeInfo.imageLinks.smallThumbnail : "https://via.placeholder.com/128x166.png";
        const infoLink = bookData.volumeInfo.infoLink ? bookData.volumeInfo.infoLink : "";

        API.saveBook({
            // bookid: id,
            title: title,
            authors: authors,
            description: description,
            image: image,
            link: infoLink
        });
    }

    const loadSearchList = () => {
        return searchList.map(book => {
            return (
                <Book 
                    key={book.id}
                    id={book.id}
                    title={book.volumeInfo.title}
                    authors={book.volumeInfo.authors}
                    image={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : "https://via.placeholder.com/128x166.png"}
                    description={book.volumeInfo.description}
                    infoLink={book.volumeInfo.infoLink}
                    bookInfo={book}
                    saveBook={saveBook}
                />
            )
        })
    }
  

    return (
        <Container fluid>
            <Banner />
            <div id="searchForm">
                <Form>
                    <Form.Group>
                        <Form.Label>Book Search</Form.Label>
                        <div className="searchDiv">
                            <Form.Control
                            value={formObject}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Search a book title" />
                            <Button
                                onClick={handleFormSubmit}
                                variant="primary"
                                type="submit">
                                Search
                            </Button> 
                        </div>
                </Form.Group>
                </Form>
            </div>
            <div id="searchResults">
                <ul>
                    {loadSearchList()}
                </ul>
            </div>
        </Container>
    )
}


export default Search;
