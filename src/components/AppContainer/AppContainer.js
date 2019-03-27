import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import CoinAction from '../CoinAction/CoinAction';
import Transactions from '../Transactions/Transactions';
import TransactionDetails from '../Transactions/TransactionDetails/TransactionDetails';
import Home from '../Home/Home';
import './AppContainer.css';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinValue: 1,
      mktCoins: 0,
      ownedCoins: 0,
      transactions: [],
    }
  }

  componentDidMount() {
    axios.get(`/transactions`)
      .then((response) => {
        this.setState({
          transactions: response.data.payload,
          mktCoins: response.data.mktCoins,
          ownedCoins: response.data.ownedCoins,
          coinValue: response.data.coinValue,
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  doAction = (props) => {
    var num = props.action === 'Mine' ? 1 : parseInt(props.num);
    var coinValue = this.state.coinValue;
    var ownedCoins = this.state.ownedCoins;
    var mktCoins = this.state.mktCoins;
    if (props.action === 'Sell') {
      coinValue -= num;
      ownedCoins -= num;
      mktCoins += num;
      if (coinValue < 1) {
        coinValue = 1;
      }
    } else if (props.action === 'Buy') {
      coinValue += num;
      ownedCoins += num;
      mktCoins -= num;
    } else if (props.action === 'Mine') {
      coinValue += num;
      ownedCoins += num;
    }
    if (ownedCoins < 0) {
      ownedCoins = 0;
    }
    if (mktCoins < 0) {
      mktCoins = 0;
    }

    let newObject = {
      title: props.action,
      amount: num,
      value: coinValue,
      coinValue: coinValue,
      ownedCoins: ownedCoins,
      mktCoins: mktCoins,
    }
    axios.post(`/transactions`, newObject)
      .then((res) => {
        axios.get(`/transactions`)
          .then((response) => {
            this.setState({
              transactions: response.data.payload,
              mktCoins: response.data.mktCoins,
              ownedCoins: response.data.ownedCoins,
              coinValue: response.data.coinValue,
            })
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      })

    /*
    let transactions = [...this.state.transactions];
    transactions.push({ id: 1, title: props.action, amount: num, value: coinValue });
    this.setState({
      coinValue,
      ownedCoins,
      mktCoins,
      transactions
    });
*/
  }

  render() {
    return (
      <div className='container appcont'>
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => (
            <Redirect to="/home" />
          )} />
          <Route path='/home' component={Home} />
          <Route path='/buy' render={(props) => (<CoinAction title='Buy' coinValue={this.state.coinValue} ownedCoins={this.state.ownedCoins} doAction={this.doAction} mktCoins={this.state.mktCoins} />)} />
          <Route path='/sell' render={(props) => (<CoinAction title='Sell' coinValue={this.state.coinValue} ownedCoins={this.state.ownedCoins} doAction={this.doAction} />)} />
          <Route path='/mine' render={(props) => (<CoinAction title='Mine' doAction={this.doAction} />)} />
          <Route path='/ledger' render={(props) => (<Transactions transactions={this.state.transactions} />)} />
          <Route path='/transactions' render={(props) => (<TransactionDetails transactions={this.state.transactions} />)} />

        </Switch>
        <Footer />
      </div>
    )
  }
}

export default AppContainer;