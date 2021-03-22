import React from 'react';
import { Link } from 'react-router-dom';

import background from'../../images/Bg.png';
import'./Header.css';

const Header = () => {
    return (
        <div style={{backgroundImage:`url(${background})`}}>
            <nav className="nav">
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                     <li>
                        <Link to="/login">login</Link>
                    </li>
                     <li>
                     <Link to="/serviceArea">serviceArea</Link>
                    </li>
                    
                </ul>

            </nav>
              <div>
                  <h1>Urban Riders</h1>
                  </div> 
           
        </div>
    );
};

export default Header;