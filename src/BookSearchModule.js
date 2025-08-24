import React, { useState } from "react";   
import axios from 'axios';  
import logo from './logo1.png';
import Card from 'react-bootstrap/Card';
import StarRatings from 'react-star-ratings';
import './App.css';
import './responsive.css';
import { Form, Button, InputGroup, Pagination } from 'react-bootstrap';

function BookSearchModule() {  
  const [query, setSearchQuery] = useState("");  
  const [items, setData] = useState([]);  
  const [currentPage, setCurrentPage] = useState(0);  
  const [totalItems, setTotalItems] = useState(0);  

  const apiKey = "AIzaSyAfpiYlIwPphbtH9tZltFci-E_ugc3vSl8";

  const maxResults = 30;   // fetch max 48 results
  const resultsPerPage = 8; // show 8 per page

  function fetchBooks() {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&key=${apiKey}`
      )
      .then((data) => {
        setData(data.data.items || []);
        setTotalItems(Math.min(data.data.totalItems || 0, maxResults)); // limit to 48
        setCurrentPage(0);
      });
  }

  function handleChange(event) {  
    setSearchQuery(event.target.value);  
  }  

  function handleSubmit(event) {  
    event.preventDefault();  
    fetchBooks();  
  }  

  // Pagination
  const totalPages = Math.ceil(items.length / resultsPerPage);
  const startIndex = currentPage * resultsPerPage;
  const currentItems = items.slice(startIndex, startIndex + resultsPerPage);

  return ( 
    <>
      <header className="App-header">
        <div className="mt-2">
          <img src={logo} alt="logo" className="img-fluid" style={{ width: "50px" }}/> Online Book Search App
        </div>

        <div className="col-9 mt-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="searchInput">
              <InputGroup>
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
        {totalItems > 0 && (
          <div className="text-center mb-3 text-muted small">
            Showing {startIndex + 1}–
            {Math.min(startIndex + resultsPerPage, totalItems)} of {totalItems} results
          </div>
        )}

        <div className="row g-4 justify-content-center">
          {currentItems.map((book, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
              <Card className="h-100 shadow">
                <div className="p-3 d-flex justify-content-center">
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      overflow: "hidden",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={
                        book.volumeInfo.imageLinks
                          ? book.volumeInfo.imageLinks.thumbnail
                          : ""
                      }
                      alt={book.volumeInfo.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>

                <Card.Body>
                  <Card.Subtitle>{book.volumeInfo.title}</Card.Subtitle>
                </Card.Body>

                <Card.Footer>
                  <div className="d-flex flex-column gap-2 w-100">
                    <div className="w-100 d-flex justify-content-center">
                      <StarRatings
                        rating={book.volumeInfo.averageRating || 0}
                        starRatedColor="yellow"
                        numberOfStars={5}
                        name="rating"
                        starDimension="18px"
                      />
                    </div>

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

        
        {items.length > 0 && (
          <div className="d-flex justify-content-center mt-2">
          <Pagination  className="justify-content-center my-3">
  <Pagination.Prev 
    onClick={() => setCurrentPage(p => Math.max(p - 1, 0))} 
    disabled={currentPage === 0} 
  />

  {[...Array(totalPages)].map((_, i) => (
    <Pagination.Item
      key={i}
      active={i === currentPage}
      onClick={() => setCurrentPage(i)}
      aria-current={null}
    >
      {i + 1}
    </Pagination.Item>
  ))}

  <Pagination.Next 
    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages - 1))} 
    disabled={currentPage === totalPages - 1} 
  />
</Pagination>

          </div>
        )}
      </div>
    </>
  );  
}  

export default BookSearchModule;  
