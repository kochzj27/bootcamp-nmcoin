import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className='footer container-fullwidth'>
        <h5 className='footer-item'>&copy; 2019 NM COIN, LLC</h5>
      </div>
    )
  }
}

export default Footer;