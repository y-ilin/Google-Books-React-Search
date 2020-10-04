import React from "react";
import Container from 'react-bootstrap/Container';
import Banner from "../components/Banner";
import SavedBooks from "../components/SavedBooks";

function Saved() {
    return (
        <Container fluid>
            <Banner />
            <SavedBooks />
        </Container>
    )
}


export default Saved;
