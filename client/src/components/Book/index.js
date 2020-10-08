import React from "react";
import "./style.css";
import Button from "react-bootstrap/Button";

function Book(props) {
  return (
    <li>
        <p className="title">{props.title}</p>
        <p className="authors">By: {props.authors ? props.authors.join(", ") : "Unknown"}</p>
        <div className="bookImgDesc">
            <img src={props.image} alt="book cover thumbnail" />
            <p className="description">{props.description}</p>
        </div>
        <div className="bookButtons">
            <Button href={props.infoLink} target="blank" variant="primary">View</Button>
            {props.saveBook ? 
                <Button onClick={() => props.saveBook(props.bookInfo)}>Save</Button> :
                <Button onClick={() => props.deleteBook(props.id)}>Delete</Button>
                    }
            {/* <Button onClick={() => props.saveBook(props.bookInfo)}>Save</Button> */}
        </div>
    </li>
)
}

export default Book;
