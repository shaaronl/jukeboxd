import React from 'react';
import {Link} from 'react-router-dom';

export default function Navbar(){
    return (
        <nav>
          <ul>
            <li>
              <Link to="/Albums">ALBUMS</Link>
            </li>
            <li>
              <Link to="/MyReviews">MY REVIEWS</Link>
            </li>
          </ul>
        </nav>
    );
}