import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class App extends Component {
    render (){
        return (
          
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <a className="navbar-brand" href="">BOOKFLIX</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto" >
                  <li class="nav-item active">
                  <Link className="nav-link" to="/login">Log In</Link>
                  </li>
                  <li class="nav-item">
                  <Link className="nav-link" to="/singup">Sign Up </Link>
                    
                  </li>
                  
                </ul>
              </div>
          </nav>
        );
    }
}

export default App; 

