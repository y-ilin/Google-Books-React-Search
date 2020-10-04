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
        console.log(event.target.value)
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
        API.saveBook({
            title: bookData.title,
            authors: bookData.authors,
            description: bookData.description,
            image: bookData.imageLinks.smallThumbnail,
            link: bookData.infoLink
        });
        console.log("saving book")
    }

    const loadSearchList = () => {
        return searchList.map(book => {
            return (
                <Book 
                    title={book.volumeInfo.title}
                    authors={book.volumeInfo.authors}
                    image={book.volumeInfo.imageLinks.smallThumbnail}
                    description={book.volumeInfo.description}
                    infoLink={book.volumeInfo.infoLink}
                    bookInfo={book.volumeInfo}
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
