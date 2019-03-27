import React, { Component } from 'react';
import './TransactionDetails.css';
import axios from 'axios';
class TransactionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      title: null,
      amount: null,
      location: null
    }
  }


  componentDidMount() {
    let location = parseInt(window.location.pathname.split('/')[2]);
    axios.get(`/transactions/${location}`)
      .then((res) => {
        this.setState({
          flag: true,
          title: res.data.payload.title,
          amount: res.data.payload.amount,
          location: location
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <h2>Ledger Transaction Details</h2>
        <p>Detailed view of a transaction from the ledger.</p>
        {this.state.flag ?
          <div className='detailed'>
            <p>Transaction <span className='bold'>#{this.state.location}</span></p>
            <p><span className='bold'>{this.state.title} {this.state.amount}</span> NM Coin</p>
          </div> : null}
      </div>
    )
  }
}

export default TransactionDetails;