import React, { useState } from 'react';
import './CoinAction.css';

const CoinAction = (props) => {
  let [number, setNum] = useState(0);

  let content = '';
  let content2 = '';
  let content3 = '';
  if (props.title === 'Mine') {
    content = `What is the 7th Fibonacci sequence number?`;
  } else if (props.title === 'Sell') {
    content = `Current NM Coin Value: $${props.coinValue}.00`;
    content2 = `Number of NM Coins Owned: ${props.ownedCoins}`;
  } else if (props.title === 'Buy') {
    content = `Current NM Coin Value: $${props.coinValue}.00`;
    content2 = `Number of Coins Available on Market: ${props.mktCoins}`;
    content3 = `Number of NM Coins Owned: ${props.ownedCoins}`;
  }

  let max;
  if (props.title === 'Buy') {
    max = props.mktCoins;
  } else if (props.title === 'Sell') {
    max = props.ownedCoins;
  }

  return (
    <div className='actions'>
      <h2>{props.title} NM Coins</h2>
      <div>
        <h6>{content || null}</h6>
        <h6>{content2 || null}</h6>
        <h6>{content3 || null}</h6>
      </div>
      <div className='input-group'>
        <input type='number' className='form-control' placeholder="Number" onChange={(e) => setNum(e.target.value)} min='0' max={max} />
        <button type='button' className='btn btn-dark' disabled={max === 0} onClick={() => props.doAction({ action: props.title, num: number })}>{props.title}</button>
      </div>
    </div>
  )
}

export default CoinAction;