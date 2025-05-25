import React, { useState } from "react";  
import axios from 'axios';  
import logo from './logo1.png';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';

import StarRatings from 'react-star-ratings';
import './App.css';
import './responsive.css';
import MadeWithLove from 'react-made-with-love';
import { Form, Button,InputGroup  } from 'react-bootstrap';


function BookSearchModule() {  
    const [query, setSearchQuery] = useState("");  
    const [items, setData] = useState([]);  
  
    const apiKey ="AIzaSyAfpiYlIwPphbtH9tZltFci-E_ugc3vSl8";

  
    function handleChange(event) {  
        const query = event.target.value;  
        setSearchQuery(query);  
    }  
    function handleSubmit(event) {  
        

        event.preventDefault();  
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + query + "&key=" + apiKey )  
            .then(data => {  
                 
                setData(data.data.items);  
            })  
    }  
    return ( 
   <>

 <header className="App-header">
  <div>
    <img src={logo} alt="logo" /> Online Book Search App
  </div>

<div className="col-10 mt">
  <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="searchInput">
      <InputGroup size="lg">
        <Form.Control
          type="text"
          placeholder="Search using Book Name, ISBN, author, keywords"
          onChange={handleChange}
        />
        <Button type="submit" variant="primary">
          Search
        </Button>
      </InputGroup>
    </Form.Group>
  </Form>
</div>
</header>
<div className="container my-4">
  <div className="row g-4 justify-content-center">
    {items.map((book, index) => (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
        <Card className="h-100 shadow"> {/* ✅ Shadow added */}
          {/* Image wrapper with fixed square and cropping */}
          <div className="p-3 d-flex justify-content-center">
            <div
              style={{
                width: '200px',
                height: '200px',
                overflow: 'hidden',
                borderRadius: '0.5rem',
              }}
            >
              <Card.Img
                variant="top"
                src={
                  book.volumeInfo.imageLinks
                    ? book.volumeInfo.imageLinks.thumbnail
                    : ''
                }
                alt={book.volumeInfo.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>

          <Card.Body>
            <Card.Subtitle>{book.volumeInfo.title}</Card.Subtitle>
          </Card.Body>

          <Card.Footer>
            <div className="d-flex flex-column gap-2 w-100">
              {/* ✅ Star Ratings full width and centered */}
              <div className="w-100 d-flex justify-content-center">
                <StarRatings
                  rating={book.volumeInfo.averageRating || 0}
                  starRatedColor="yellow"
                  numberOfStars={5}
                  name="rating"
                  starDimension="18px"
                />
              </div>

              {/* Preview Button */}
              <a
                href={book.volumeInfo.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary btn-sm w-100"
              >
                See This Book
              </a>
            </div>
          </Card.Footer>
        </Card>
      </div>
    ))}
  </div>
</div>


</>

        
  
    )  
}  
  
export default BookSearchModule  
