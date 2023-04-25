import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-black text-white uppercase">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">Tasks</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><Link to="/">Form</Link></li>
      <li><Link to="views">Views</Link></li>
      
    </ul>
  </div>
</div>
        </div>
    );
};

export default Navbar;