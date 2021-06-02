import React, { useState } from "react";  
import axios from 'axios';  
import logo from './logo1.png';
import { Card } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import './App.css';
import './responsive.css';
import MadeWithLove from 'react-made-with-love';


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
        <form onSubmit={handleSubmit}>  
             < header className="App-header"> 

    <div>
                
              <img src={logo} alt="logo" /> Online Book Search App

              </div>
            
          
                       <div className="col-10 mt"> 
                        <input  onChange={handleChange} className="mb form-control form-control-lg" type="text" placeholder="Search using Book Name,ISBN,author,keywords" aria-label=".form-control-lg example" />

                   
                    <div  >  
                        <input type="submit" value="Search" className="btn btn-primary btn-lg" />  
                    </div>  

                    </div>
                
            </ header> 

          
            <div className="container">  
                <div className="row">  
                    {items.map(book => ( 
                        
                        <div className="col-2">  
                            <Card style={{  'margin': '15px' }} >  
  
                            <Card.Img variant="top" src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : ''} alt={book.title} />                                  <Card.Body>  
                            <Card.Subtitle >{book.volumeInfo.title}</Card.Subtitle >

                          
                                     
                                </Card.Body>  
                            </Card>
                            < StarRatings
          rating={book.volumeInfo.averageRating}
          starRatedColor="yellow"
          numberOfStars={5}
          name='rating'
          starDimension="18px"

        />  
        <div className="mt"> <a target="_blank" href= {book.volumeInfo.previewLink} className="btn btn-outline-info">Preview</a> </div>
                        </div> 
                  
                    ))}

                                    
                
                </div>  
            </div>  


        </form>  

        
  
    )  
}  
  
export default BookSearchModule  
