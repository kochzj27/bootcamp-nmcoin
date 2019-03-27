import React from 'react';
import { Link } from 'react-router-dom';
import './Transactions.css';

const Transactions = (props) => {

  var listItems = null;

  if (props.transactions.length > 0) {
    listItems = props.transactions.map((item, idx) => {
      return (
        <div key={idx} className='listItem'>
          <h6 className='listItemBox firstItem'>{item.title}</h6><h6 className='listItemBox'>{item.amount}</h6><h6 className='listItemBox'>{item.value}</h6><button className='btn btn-info btn1'><Link className='linkColor' to={{ pathname: `/transactions/${item.id}` }}>Details</Link></button>
        </div>
      )
    });
  }


  return (
    <div>
      <h2>Browse the Ledger</h2>
      <p>
        Here you can browse all NM Coin transactions.</p>

      <div className='ledger'>
        <h3 className='ledger-title'> NM COIN Ledger</h3>
        <div className='list'>
          {listItems ? <div className='listItem'><h6 className='topRowItem'>Action</h6><h6 className='topRowItem'>Amount</h6><h6 className='topRowItem'>Value</h6><h6 className='topRowItem'>&nbsp;</h6></div> : null}
          {listItems || <h6 className='notrans'>No Transactions</h6>}
        </div>
      </div>
    </div>
  )
}

export default Transactions;