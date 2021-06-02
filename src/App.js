import axios from 'axios';
import BookSearchModule from './BookSearchModule';
import {Card,Navbar,NavbarBrand,NavbarText,Container, NavItem} from 'reactstrap';
import MadeWithLove from 'react-made-with-love';


import './App.css';

function App() {



  return (
    <div className="App">
      
      <BookSearchModule></BookSearchModule>

      <div className="fixed-bottom">  
               
                <Card body  color="light" className="text-center">
                    <MadeWithLove
  by="Aritra"
  emoji
/>
</Card >
                    
              
        </div>


</div>
 
 
 
 );
}

export default App;
