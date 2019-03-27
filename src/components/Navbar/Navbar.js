import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className='navbar header'>
        <Link to='/home'><h3 className='navitem'>Home</h3></Link>
        <Link to='/mine'><h3 className='navitem'>Mine Coins</h3></Link>
        <Link to='/buy'><h3 className='navitem'>Buy Coins</h3></Link>
        <Link to='/sell'><h3 className='navitem'>Sell Coins</h3></Link>
        <Link to='/ledger'><h3 className='navitem'>Browser Ledger</h3></Link>
      </div>
    )
  }
}

export default Navbar;